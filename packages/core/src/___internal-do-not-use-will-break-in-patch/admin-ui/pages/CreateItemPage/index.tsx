import { useRouter } from 'next/router'

import { Button } from '@keystar/ui/button'
import { VStack } from '@keystar/ui/layout'

import { Fields } from '../../../../admin-ui/utils'
import { PageContainer } from '../../../../admin-ui/components/PageContainer'
import { useList } from '../../../../admin-ui'
import { GraphQLErrorNotice } from '../../../../admin-ui/components'
import { useCreateItem } from '../../../../admin-ui/utils/useCreateItem'
import { BaseToolbar, ColumnLayout, ItemPageHeader } from '../ItemPage/common'

export const getCreateItemPage = (props: Parameters<typeof CreateItemPage>[0]) => () => (
  <CreateItemPage {...props} />
)

function CreateItemPage({ listKey }: { listKey: string }) {
  const list = useList(listKey)
  const createItem = useCreateItem(list)
  const router = useRouter()

  return (
    <PageContainer
      title={`Create ${list.singular}`}
      header={<ItemPageHeader list={list} label="Create" title={`Create ${list.singular}`} />}
    >
      <ColumnLayout>
        <form
          onSubmit={async e => {
            if (e.target !== e.currentTarget) return
            e.preventDefault()

            const item = await createItem.create()
            if (!item) return

            router.push(`/${list.path}/${item.id}`)
          }}
          style={{ display: 'contents' }}
        >
          {/*
            Workaround for react-aria "bug" where pressing enter in a form field
            moves focus to the submit button.
            See: https://github.com/adobe/react-spectrum/issues/5940
          */}
          <button type="submit" style={{ display: 'none' }} />
          <VStack gap="large" gridArea="main" marginTop="xlarge" minWidth={0}>
            <GraphQLErrorNotice
              errors={[
                createItem?.error?.networkError,
                ...(createItem?.error?.graphQLErrors ?? []),
              ]}
            />
            <Fields {...createItem.props} />
          </VStack>

          <BaseToolbar>
            <Button isPending={createItem.state === 'loading'} prominence="high" type="submit">
              Create
            </Button>
          </BaseToolbar>
        </form>
      </ColumnLayout>
    </PageContainer>
  )
}
