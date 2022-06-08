/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx } from '@keystone-ui/core';
import { FieldContainer, FieldLabel } from '@keystone-ui/fields';

import {
  FieldProps,
} from '@keystone-6/core/types';
import { controller, Field as DocField } from '@keystone-6/fields-document/views';

const limit = 140;
const approaching = 120;
const amber = '#ffca3a';
const red = '#ff2128';
const green = '#8ac926';

const docCount = (value: Array<any>) => {
  let length = 0;
  for (const v of value) {
    if (v.text) {
      length += v.text.length;
    }
    if (v.children) {
      length += docCount(v.children);
    }
  }
  return length;
};

export const Field = ({
  field,
  value,
  onChange,
  autoFocus,
  forceValidation,
}: FieldProps<typeof controller>) => {
  console.log(field.path);
  const isReverseCount = field.path === 'content2';
  const count = docCount(value);
  return (
    <FieldContainer>
      <FieldLabel as="span" id={`${field.path}-label-custom`} css={{
        color: count < approaching ? green : count < limit ? amber : red,
      }}>
        {field.label} ({isReverseCount ? limit - count : count})
      </FieldLabel>
      <span css={{
        [`#${field.path}-label`]: {
          display: 'none',
        }
      }}>
        <DocField field={field} value={value} onChange={onChange} autoFocus={autoFocus} forceValidation={forceValidation} />
      </span>
    </FieldContainer>
  );
};

export { controller, type DocumentFeatures, CardValue, Cell } from '@keystone-6/fields-document/views';
