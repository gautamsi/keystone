
import { list } from '@keystone-6/core';
import { text,select,relationship,timestamp } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { Lists } from '.keystone/types';

export const Checkpoint: Lists.Checkpoint = list({
  access: allowAll,
  
  fields: {
    friendlyId: text({  }),
    type: select({ options: [{ label: 'Docker', value: 'docker' },
{ label: 'Kubernetes', value: 'kubernetes' }],  }),
    location: text({  }),
    imageRef: text({  }),
    reason: text({  }),
    metadata: text({  }),
    events: relationship({ ref: 'CheckpointRestoreEvent.checkpoint', many: true }),
    run: relationship({ ref: 'TaskRun.checkpoints' }),
    attempt: relationship({ ref: 'TaskRunAttempt.checkpoints' }),
    project: relationship({ ref: 'Project.checkpoints' }),
    runtimeEnvironment: relationship({ ref: 'RuntimeEnvironment.checkpoints' }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } })
  }
});
