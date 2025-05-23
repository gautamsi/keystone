import { gen, sampleOne } from 'testcheck'
import { text, relationship } from '@keystone-6/core/fields'
import { list } from '@keystone-6/core'
import { setupTestRunner } from '@keystone-6/api-tests/test-runner'
import type { KeystoneContext } from '@keystone-6/core/types'
import { allowAll } from '@keystone-6/core/access'
import { type ContextFromRunner } from '../../utils'

type IdType = any

const alphanumGenerator = gen.alphaNumString.notEmpty()

const createInitialData = async (context: ContextFromRunner<typeof runner>) => {
  const companies = await context.query.Company.createMany({
    data: [
      { name: sampleOne(alphanumGenerator) },
      { name: sampleOne(alphanumGenerator) },
      { name: sampleOne(alphanumGenerator) },
    ],
  })
  const locations = await context.query.Location.createMany({
    data: [
      { name: sampleOne(alphanumGenerator) },
      { name: sampleOne(alphanumGenerator) },
      { name: sampleOne(alphanumGenerator) },
    ],
  })
  return { locations, companies }
}

const createCompanyAndLocation = async (context: ContextFromRunner<typeof runner>) => {
  const company = await context.query.Company.createOne({
    data: { locations: { create: [{ name: sampleOne(alphanumGenerator) }] } },
    query: 'id locations { id companies { id } }',
  })
  const { Company, Location } = await getCompanyAndLocation(
    context,
    company.id,
    company.locations[0].id
  )

  // Sanity check the links are setup correctly
  expect(Company.locations[0].id.toString()).toBe(Location.id.toString())
  expect(Location.companies[0].id.toString()).toBe(Company.id.toString())

  return { company, location: company.locations[0] }
}

const getCompanyAndLocation = async (
  context: KeystoneContext,
  companyId: IdType,
  locationId: IdType
) => {
  type T = {
    data: {
      Company: { id: IdType; locations: { id: IdType }[] }
      Location: { id: IdType; companies: { id: IdType }[] }
    }
  }
  const { data } = (await context.graphql.raw({
    query: `
      {
        Company: company(where: { id: "${companyId}"} ) { id locations { id } }
        Location: location(where: { id: "${locationId}"} ) { id companies { id } }
      }`,
  })) as T
  return data
}

const createReadData = async (context: ContextFromRunner<typeof runner>) => {
  // create locations [A, A, B, B, C, C];
  const locations = await context.query.Location.createMany({
    data: ['A', 'A', 'B', 'B', 'C', 'C'].map(name => ({ name })),
    query: 'id name',
  })
  await Promise.all(
    [
      [0, 1, 2, 3, 4, 5], //  -> [A, A, B, B, C, C]
      [0, 2, 4], //  -> [A, B, C]
      [0, 1], //  -> [A, A]
      [0, 2], //  -> [A, B]
      [0, 4], //  -> [A, C]
      [2, 3], //  -> [B, B]
      [0], //  -> [A]
      [2], //  -> [B]
      [], //  -> []
    ].map(async locationIdxs => {
      await context.query.Company.createOne({
        data: { locations: { connect: locationIdxs.map(i => ({ id: locations[i].id })) } },
        query: 'id locations { name }',
      })
    })
  )
}

const runner = setupTestRunner({
  config: {
    lists: {
      Company: list({
        access: allowAll,
        fields: {
          name: text(),
          locations: relationship({ ref: 'Location.companies', many: true }),
        },
      }),
      Location: list({
        access: allowAll,
        fields: {
          name: text(),
          companies: relationship({ ref: 'Company.locations', many: true }),
        },
      }),
    },
  },
})

describe(`Many-to-many relationships`, () => {
  describe('Read', () => {
    test(
      'some',
      runner(async ({ context }) => {
        await createReadData(context)
        await Promise.all(
          [
            ['A', 6],
            ['B', 5],
            ['C', 3],
            ['D', 0],
          ].map(async ([name, count]) => {
            const companies = await context.query.Company.findMany({
              where: { locations: { some: { name: { equals: name } } } },
            })
            expect(companies.length).toEqual(count)
          })
        )
      })
    )
    test(
      'none',
      runner(async ({ context }) => {
        await createReadData(context)
        await Promise.all(
          [
            ['A', 3],
            ['B', 4],
            ['C', 6],
            ['D', 9],
          ].map(async ([name, count]) => {
            const companies = await context.query.Company.findMany({
              where: { locations: { none: { name: { equals: name } } } },
            })
            expect(companies.length).toEqual(count)
          })
        )
      })
    )
    test(
      'every',
      runner(async ({ context }) => {
        await createReadData(context)
        await Promise.all(
          [
            ['A', 3],
            ['B', 3],
            ['C', 1],
            ['D', 1],
          ].map(async ([name, count]) => {
            const companies = await context.query.Company.findMany({
              where: { locations: { every: { name: { equals: name } } } },
            })
            expect(companies.length).toEqual(count)
          })
        )
      })
    )
  })

  describe('Count', () => {
    test(
      'Count',
      runner(async ({ context }) => {
        await createInitialData(context)
        const companiesCount = await context.query.Company.count()
        const locationsCount = await context.query.Location.count()
        expect(companiesCount).toEqual(3)
        expect(locationsCount).toEqual(3)
      })
    )
    test(
      'some',
      runner(async ({ context }) => {
        await createReadData(context)
        await Promise.all(
          [
            ['A', 6],
            ['B', 5],
            ['C', 3],
            ['D', 0],
          ].map(async ([name, count]) => {
            const _count = await context.query.Company.count({
              where: { locations: { some: { name: { equals: name } } } },
            })
            expect(_count).toEqual(count)
          })
        )
      })
    )
    test(
      'none',
      runner(async ({ context }) => {
        await createReadData(context)
        await Promise.all(
          [
            ['A', 3],
            ['B', 4],
            ['C', 6],
            ['D', 9],
          ].map(async ([name, count]) => {
            const _count = await context.query.Company.count({
              where: { locations: { none: { name: { equals: name } } } },
            })
            expect(_count).toEqual(count)
          })
        )
      })
    )
    test(
      'every',
      runner(async ({ context }) => {
        await createReadData(context)
        await Promise.all(
          [
            ['A', 3],
            ['B', 3],
            ['C', 1],
            ['D', 1],
          ].map(async ([name, count]) => {
            const _count = await context.query.Company.count({
              where: { locations: { every: { name: { equals: name } } } },
            })
            expect(_count).toEqual(count)
          })
        )
      })
    )
  })

  describe('Create', () => {
    test(
      'With connect',
      runner(async ({ context }) => {
        const { locations } = await createInitialData(context)
        const location = locations[0]
        const company = await context.query.Company.createOne({
          data: { locations: { connect: [{ id: location.id }] } },
          query: 'id locations { id }',
        })
        expect(company.locations[0].id.toString()).toEqual(location.id)

        const { Company, Location } = await getCompanyAndLocation(context, company.id, location.id)

        // Everything should now be connected
        expect(Company.locations.map(({ id }) => id.toString())).toEqual([Location.id.toString()])
        expect(Location.companies.map(({ id }) => id.toString())).toEqual([Company.id.toString()])
      })
    )

    test(
      'With create',
      runner(async ({ context }) => {
        const locationName = sampleOne(alphanumGenerator)
        const company = await context.query.Company.createOne({
          data: { locations: { create: [{ name: locationName }] } },
          query: 'id locations { id }',
        })

        const { Company, Location } = await getCompanyAndLocation(
          context,
          company.id,
          company.locations[0].id
        )

        // Everything should now be connected
        expect(Company.locations.map(({ id }) => id.toString())).toEqual([Location.id.toString()])
        expect(Location.companies.map(({ id }) => id.toString())).toEqual([Company.id.toString()])
      })
    )

    test(
      'With nested connect',
      runner(async ({ context }) => {
        const { companies } = await createInitialData(context)
        const company = companies[0]
        const locationName = sampleOne(alphanumGenerator)

        const _company = await context.query.Company.createOne({
          data: {
            locations: {
              create: [{ name: locationName, companies: { connect: [{ id: company.id }] } }],
            },
          },
          query: 'id locations { id companies { id } }',
        })
        const { Company, Location } = await getCompanyAndLocation(
          context,
          _company.id,
          _company.locations[0].id
        )
        // Everything should now be connected
        expect(Company.locations.map(({ id }) => id.toString())).toEqual([Location.id.toString()])
        expect(Location.companies.length).toEqual(2)

        type T = {
          id: IdType
          locations: { id: IdType; companies: { id: IdType }[] }[]
        }[]

        const _companies = (await context.query.Company.findMany({
          query: 'id locations { id companies { id } }',
        })) as T
        // Both companies should have a location, and the location should have two companies
        const linkedCompanies = _companies.filter(
          ({ id }) => id === company.id || id === Company.id
        )
        linkedCompanies.forEach(({ locations }) => {
          expect(locations.map(({ id }) => id)).toEqual([Location.id.toString()])
        })
        expect(linkedCompanies[0].locations[0].companies.map(({ id }) => id).sort()).toEqual(
          [linkedCompanies[0].id, linkedCompanies[1].id].sort()
        )
      })
    )

    test(
      'With nested create',
      runner(async ({ context }) => {
        const locationName = sampleOne(alphanumGenerator)
        const companyName = sampleOne(alphanumGenerator)

        const company = await context.query.Company.createOne({
          data: {
            locations: {
              create: [{ name: locationName, companies: { create: [{ name: companyName }] } }],
            },
          },
          query: 'id locations { id companies { id } }',
        })

        const { Company, Location } = await getCompanyAndLocation(
          context,
          company.id,
          company.locations[0].id
        )

        // Everything should now be connected
        expect(Company.locations.map(({ id }) => id.toString())).toEqual([Location.id.toString()])
        expect(Location.companies.length).toEqual(2)

        // Both companies should have a location, and the location should have two companies
        type T = {
          id: IdType
          locations: { id: IdType; companies: { id: IdType }[] }[]
        }[]

        const _companies = (await context.query.Company.findMany({
          query: 'id locations { id companies { id } }',
        })) as T
        _companies.forEach(({ locations }) => {
          expect(locations.map(({ id }) => id)).toEqual([Location.id.toString()])
        })
        expect(_companies[0].locations[0].companies.map(({ id }) => id).sort()).toEqual(
          [_companies[0].id, _companies[1].id].sort()
        )
      })
    )

    test(
      'With null',
      runner(async ({ context }) => {
        const company = await context.query.Company.createOne({
          data: { locations: null },
          query: 'id locations { id }',
        })

        // Locations should be empty
        expect(company.locations).toHaveLength(0)
      })
    )
  })

  describe('Update', () => {
    test(
      'With connect',
      runner(async ({ context }) => {
        // Manually setup a connected Company <-> Location
        const { location, company } = await createCompanyAndLocation(context)

        // Sanity check the links don't yet exist
        // `...not.toBe(expect.anything())` allows null and undefined values
        expect(company.locations).not.toBe(expect.anything())
        expect(location.companies).not.toBe(expect.anything())

        await context.query.Company.updateOne({
          where: { id: company.id },
          data: { locations: { connect: [{ id: location.id }] } },
          query: 'id locations { id }',
        })

        const { Company, Location } = await getCompanyAndLocation(context, company.id, location.id)
        // Everything should now be connected
        expect(Company.locations.map(({ id }) => id.toString())).toEqual([Location.id.toString()])
        expect(Location.companies.map(({ id }) => id.toString())).toEqual([Company.id.toString()])
      })
    )

    test(
      'With create',
      runner(async ({ context }) => {
        const { companies } = await createInitialData(context)
        const company = companies[0]
        const locationName = sampleOne(alphanumGenerator)
        const _company = await context.query.Company.updateOne({
          where: { id: company.id },
          data: { locations: { create: [{ name: locationName }] } },
          query: 'id locations { id name }',
        })

        const { Company, Location } = await getCompanyAndLocation(
          context,
          company.id,
          _company.locations[0].id
        )

        // Everything should now be connected
        expect(Company.locations.map(({ id }) => id.toString())).toEqual([Location.id.toString()])
        expect(Location.companies.map(({ id }) => id.toString())).toEqual([Company.id.toString()])
      })
    )

    test(
      'With disconnect',
      runner(async ({ context }) => {
        // Manually setup a connected Company <-> Location
        const { location, company } = await createCompanyAndLocation(context)

        // Run the query to disconnect the location from company
        const _company = await context.query.Company.updateOne({
          where: { id: company.id },
          data: { locations: { disconnect: [{ id: location.id }] } },
          query: 'id locations { id name }',
        })
        expect(_company.id).toEqual(company.id)
        expect(_company.locations).toEqual([])

        // Check the link has been broken
        const result = await getCompanyAndLocation(context, company.id, location.id)
        expect(result.Company.locations).toEqual([])
        expect(result.Location.companies).toEqual([])
      })
    )

    test(
      'With set: []',
      runner(async ({ context }) => {
        // Manually setup a connected Company <-> Location
        const { location, company } = await createCompanyAndLocation(context)

        // Run the query to disconnect the location from company
        const _company = await context.query.Company.updateOne({
          where: { id: company.id },
          data: { locations: { set: [] } },
          query: 'id locations { id name }',
        })
        expect(_company.id).toEqual(company.id)
        expect(_company.locations).toEqual([])

        // Check the link has been broken
        const result = await getCompanyAndLocation(context, company.id, location.id)
        expect(result.Company.locations).toEqual([])
        expect(result.Location.companies).toEqual([])
      })
    )

    test(
      'With null',
      runner(async ({ context }) => {
        // Manually setup a connected Company <-> Location
        const { location, company } = await createCompanyAndLocation(context)

        // Run the query with a null operation
        const _company = await context.query.Company.updateOne({
          where: { id: company.id },
          data: { locations: null },
          query: 'id locations { id name }',
        })

        // Check that the locations are still there
        expect(_company.id).toEqual(company.id)
        expect(_company.locations).toHaveLength(1)
        expect(_company.locations[0].id).toEqual(location.id)
      })
    )
  })

  describe('Delete', () => {
    test(
      'delete',
      runner(async ({ context }) => {
        // Manually setup a connected Company <-> Location
        const { location, company } = await createCompanyAndLocation(context)

        // Run the query to disconnect the location from company
        const _company = await context.query.Company.deleteOne({ where: { id: company.id } })
        expect(_company?.id).toBe(company.id)

        // Check the link has been broken
        const result = await getCompanyAndLocation(context, company.id, location.id)
        expect(result.Company).toBe(null)
        expect(result.Location.companies).toEqual([])
      })
    )
  })
})
