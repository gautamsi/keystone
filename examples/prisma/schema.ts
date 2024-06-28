import { list, graphQLSchemaExtension, gql, graphql } from '@keystone-6/core';
import {
  text,
  relationship,
  checkbox,
  password,
  timestamp,
  select,
  virtual,
  image,
  file,
} from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';
import { v4 } from 'uuid';
import { allowAll } from '@keystone-6/core/access';
import { Context, Lists } from '.keystone/types';

type AccessArgs = {
  session?: {
    itemId?: string;
    listKey?: string;
    data: {
      name?: string;
      isAdmin: boolean;
    };
  };
  item?: any;
};

export const access = {
  isAdmin: ({ session }: AccessArgs) => !!session?.data.isAdmin,
};

const randomNumber = () => Math.round(Math.random() * 10);

const User: Lists.User = list({
  access: allowAll,
  ui: {
    listView: {
      initialColumns: ['name', 'posts', 'avatar'],
    },
  },
  db: { idField: { kind: 'autoincrement', type: 'BigInt' } },
  fields: {
    /** The user's first and last name. */
    name: text({ validation: { isRequired: true } }),
    /** Email is used to log into the system. */
    email: text({ isIndexed: 'unique', validation: { isRequired: true } }),
    /** Avatar upload for the users profile, stored locally */
    avatar: image({ storage: 'my_images' }),
    attachment: file({ storage: 'my_files' }),
    /** Used to log in. */
    password: password(),
    /** Administrators have more access to various lists and fields. */
    isAdmin: checkbox({
      access: {
        read: access.isAdmin,
        create: access.isAdmin,
        update: access.isAdmin,
      },
      ui: {
        createView: {
          fieldMode: args => (access.isAdmin(args) ? 'edit' : 'hidden'),
        },
        itemView: {
          fieldMode: args => (access.isAdmin(args) ? 'edit' : 'read'),
        },
      },
    }),
    roles: text({}),
    phoneNumbers: relationship({
      ref: 'PhoneNumber',
      many: true,
      ui: {
        // TODO: Work out how to use custom views to customise the card + edit / create forms
        // views: './admin/fieldViews/user/phoneNumber',
        displayMode: 'cards',
        cardFields: ['type', 'value'],
        inlineEdit: { fields: ['type', 'value'] },
        inlineCreate: { fields: ['type', 'value'] },
        linkToItem: true,
        // removeMode: 'delete',
      },
    }),
    posts: relationship({ ref: 'Post.author', many: true }),
    randomNumber: virtual({
      field: graphql.field({
        type: graphql.Float,
        resolve() {
          return randomNumber();
        },
      }),
    }),
    // 1:1 from User -> List1 ONE WAY
    list1: relationship({ ref: 'List1', many: false }),
    // 1:n from User -> List2 ONE WAY
    list2s: relationship({ ref: 'List2', many: true }),
    // 1:1 from User -> List3 TWO WAY
    list3: relationship({ ref: 'List3.user', many: false }),
    // 1:n from User -> List4 TWO WAY
    list4s: relationship({ ref: 'List4.user', many: true }),
    // n:n from User -> List5 TWO WAY
    list5s: relationship({ ref: 'List5.users', many: true }),
    // n:n from User -> List6 TWO ONE WAY
    list6s: relationship({ ref: 'List6', many: true }),
    // 1:1 from User -> List7 TWO ONE WAY
    list7: relationship({ ref: 'List7', many: false }),
    // 1:n from User -> List8 TWO ONE WAY
    list8: relationship({ ref: 'List8', many: true }),
  },
});

export const lists: Lists = {
  User,
  List1: list({
    access: allowAll,
    fields: {
      name: text({}),
    }
  }),
  List2: list({
    access: allowAll,
    fields: {
      name: text({}),
    }
  }),
  List3: list({
    access: allowAll,
    fields: {
      name: text({}),
      // 1:1 from User -> List3 TWO WAY
      user: relationship({ ref: 'User.list3', many: false }),
    }
  }),
  List4: list({
    access: allowAll,
    fields: {
      name: text({}),
      // 1:n from User -> List4 TWO WAY
      user: relationship({ ref: 'User.list4s', many: false }),
    }
  }),
  List5: list({
    access: allowAll,
    fields: {
      name: text({}),
      // n:n from User -> List5 TWO WAY
      users: relationship({ ref: 'User.list5s', many: true }),
    }
  }),
  List6: list({
    access: allowAll,
    fields: {
      name: text({}),
      // many to many from User -> List6 TWO ONE WAY
      users: relationship({ ref: 'User', many: true }),
    }
  }),
  List7: list({
    access: allowAll,
    fields: {
      name: text({}),
      // 1:1 from User -> List7 TWO ONE WAY
      user: relationship({ ref: 'User', many: false }),
    }
  }),
  List8: list({
    access: allowAll,
    fields: {
      name: text({}),
      // 1:n from User -> List8 TWO ONE WAY
      user: relationship({ ref: 'User', many: false }),
    }
  }),
  PhoneNumber: list({
    access: allowAll,
    ui: {
      isHidden: true,
      // parentRelationship: 'user',
    },
    db: { idField: { kind: 'autoincrement', type: 'BigInt' } },
    fields: {
      label: virtual({
        field: graphql.field({
          type: graphql.String,
          resolve(item) {
            return `${item.type} - ${item.value}`;
          },
        }),
        ui: {
          listView: {
            fieldMode: 'hidden',
          },
          itemView: {
            fieldMode: 'hidden',
          },
        },
      }),
      user: relationship({ ref: 'User' }),
      type: select({
        options: [
          { label: 'Home', value: 'home' },
          { label: 'Work', value: 'work' },
          { label: 'Mobile', value: 'mobile' },
        ],
        ui: {
          displayMode: 'segmented-control',
        },
      }),
      value: text({}),
    },
  }),
  Post: list({
    access: allowAll,
    db: { idField: { kind: 'autoincrement', type: 'BigInt' } },
    fields: {
      title: text({ access: {} }),
      status: select({
        options: [
          { label: 'Published', value: 'published' },
          { label: 'Draft', value: 'draft' },
        ],
        ui: {
          displayMode: 'segmented-control',
        },
        validation: {
          isRequired: true,
        },
        defaultValue: 'draft',
      }),
      content: document({
        relationships: {
          mention: {
            label: 'Mention',
            listKey: 'User',
          },
        },
        formatting: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
          [2, 1],
          [1, 2],
          [1, 2, 1],
        ],
        links: true,
        dividers: true,
      }),
      publishDate: timestamp(),
      author: relationship({
        ref: 'User.posts',
        ui: {
          displayMode: 'cards',
          cardFields: ['name', 'email'],
          inlineEdit: { fields: ['name', 'email'] },
          linkToItem: true,
          inlineCreate: { fields: ['name', 'email'] },
        },
      }),
    },
  }),
};

// note this usage of the type is important because it tests that the generated types work
export const extendGraphqlSchema = graphQLSchemaExtension<Context>({
  typeDefs: gql`
    type Query {
      randomNumber: RandomNumber
      uuid: ID!
    }
    type RandomNumber {
      number: Int
      generatedAt: Int
    }
    type Mutation {
      createRandomPosts: [Post!]!
    }
  `,
  resolvers: {
    RandomNumber: {
      number(rootVal: { number: number; }) {
        return rootVal.number * 1000;
      },
    },
    Mutation: {
      createRandomPosts(root, args, context) {
        const data = Array.from({ length: 238 }).map((x, i) => ({ title: `Post ${i}` }));
        return context.db.Post.createMany({ data });
      },
    },
    Query: {
      randomNumber: () => ({
        number: randomNumber(),
        generatedAt: Date.now(),
      }),
      uuid: () => v4(),
    },
  },
});
