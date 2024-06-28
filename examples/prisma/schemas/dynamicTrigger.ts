
import { list } from '@keystone-6/core';
import { select,text,relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const DynamicTrigger: Lists.DynamicTrigger = list({
  access: allowAll,
  
  fields: {
    type: select({ options: [{ label: 'Event', value: 'event' },
{ label: 'Schedule', value: 'schedule' }], defaultValue: 'EVENT' }),
    slug: text({  }),
    endpoint: relationship({ ref: 'Endpoint.dynamictriggers' }),
    jobs: relationship({ ref: 'Job.dynamicTriggers', many: true }),
    sources: relationship({ ref: 'TriggerSource.dynamicTrigger', many: true }),
    scheduleSources: relationship({ ref: 'ScheduleSource.dynamicTrigger', many: true }),
    registrations: relationship({ ref: 'DynamicTriggerRegistration.dynamicTrigger', many: true }),
    sourceRegistrationJob: relationship({ ref: 'JobVersion.dynamicTriggers' })
  }
});
