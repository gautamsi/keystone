/** @jsxImportSource @emotion/react */

'use client'

import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'

import { Type } from './primitives/Type'

type Path = { title: string; href: string }

export function Breadcrumbs() {
  const router = useRouter()
  const pathname = usePathname()

  // remove anchor and split path
  const linkPath = new URL(pathname || '', 'https://keystonejs.com').pathname.split('/')
  linkPath.shift()

  const breadcrumbs = linkPath.map((path, i): Path => {
    return { title: path.replace(/-/g, ' '), href: '/' + linkPath.slice(0, i + 1).join('/') }
  })

  if (breadcrumbs.length < 2) {
    return null
  }

  return (
    <nav
      aria-label="breadcrumbs"
      css={{
        marginBottom: '1rem',
      }}
    >
      <ul
        css={{
          margin: '0 !important',
          padding: '0 !important',
          fontSize: '0.75rem',
          '& li': {
            position: 'relative',
            display: 'inline-block',
            paddingLeft: '0 !important',
            marginTop: 0,
          },
          '& li a': {
            textDecoration: 'none',
          },
          '& li a:hover span, & li a:focus span': {
            color: 'var(--link)',
          },
          '& li + li': {
            marginLeft: '0.5em',
            paddingLeft: '0.875em !important',
          },
          '&& li:before': {
            position: 'absolute',
            content: '"/"',
            top: 0,
            left: 0,
            width: 'auto',
            height: 'auto',
            backgroundColor: 'transparent',
          },
          '& li:first-child:before': {
            display: 'none',
          },
        }}
      >
        {breadcrumbs.map(({ title, href }) => (
          <li key={href}>
            <Link href={href}>
              <Type
                look="body12"
                css={{
                  textTransform: 'uppercase',
                  color: 'var(--muted)',
                }}
              >
                {title}
              </Type>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
