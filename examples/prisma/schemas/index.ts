
import { User } from './user';
import { InvitationCode } from './invitationCode';
import { AuthorizationCode } from './authorizationCode';
import { PersonalAccessToken } from './personalAccessToken';
import { Organization } from './organization';
import { ExternalAccount } from './externalAccount';
import { IntegrationAuthMethod } from './integrationAuthMethod';
import { IntegrationDefinition } from './integrationDefinition';
import { Integration } from './integration';
import { IntegrationConnection } from './integrationConnection';
import { ConnectionAttempt } from './connectionAttempt';
import { OrgMember } from './orgMember';
import { OrgMemberInvite } from './orgMemberInvite';
import { RuntimeEnvironment } from './runtimeEnvironment';
import { Project } from './project';
import { Endpoint } from './endpoint';
import { EndpointIndex } from './endpointIndex';
import { Job } from './job';
import { JobVersion } from './jobVersion';
import { EventExample } from './eventExample';
import { ConcurrencyLimitGroup } from './concurrencyLimitGroup';
import { JobQueue } from './jobQueue';
import { JobAlias } from './jobAlias';
import { JobIntegration } from './jobIntegration';
import { RunConnection } from './runConnection';
import { DynamicTrigger } from './dynamicTrigger';
import { EventDispatcher } from './eventDispatcher';
import { EventRecord } from './eventRecord';
import { JobRun } from './jobRun';
import { JobCounter } from './jobCounter';
import { JobRunAutoYieldExecution } from './jobRunAutoYieldExecution';
import { JobRunSubscription } from './jobRunSubscription';
import { JobRunExecution } from './jobRunExecution';
import { Task } from './task';
import { TaskAttempt } from './taskAttempt';
import { JobRunStatusRecord } from './jobRunStatusRecord';
import { SecretReference } from './secretReference';
import { SecretStore } from './secretStore';
import { TriggerSource } from './triggerSource';
import { TriggerSourceOption } from './triggerSourceOption';
import { Webhook } from './webhook';
import { WebhookEnvironment } from './webhookEnvironment';
import { WebhookRequestDelivery } from './webhookRequestDelivery';
import { WebhookDeliveryCounter } from './webhookDeliveryCounter';
import { DynamicTriggerRegistration } from './dynamicTriggerRegistration';
import { HttpSourceRequestDelivery } from './httpSourceRequestDelivery';
import { ScheduleSource } from './scheduleSource';
import { TriggerHttpEndpoint } from './triggerHttpEndpoint';
import { TriggerHttpEndpointEnvironment } from './triggerHttpEndpointEnvironment';
import { KeyValueItem } from './keyValueItem';
import { MissingConnection } from './missingConnection';
import { ApiIntegrationVote } from './apiIntegrationVote';
import { DataMigration } from './dataMigration';
import { DeferredScheduledEventService } from './deferredScheduledEventService';
import { BackgroundWorker } from './backgroundWorker';
import { BackgroundWorkerTask } from './backgroundWorkerTask';
import { TaskRun } from './taskRun';
import { TaskRunDependency } from './taskRunDependency';
import { TaskRunCounter } from './taskRunCounter';
import { TaskRunNumberCounter } from './taskRunNumberCounter';
import { TaskTag } from './taskTag';
import { TaskRunAttempt } from './taskRunAttempt';
import { TaskEvent } from './taskEvent';
import { TaskQueue } from './taskQueue';
import { BatchTaskRun } from './batchTaskRun';
import { BatchTaskRunItem } from './batchTaskRunItem';
import { EnvironmentVariable } from './environmentVariable';
import { EnvironmentVariableValue } from './environmentVariableValue';
import { Checkpoint } from './checkpoint';
import { CheckpointRestoreEvent } from './checkpointRestoreEvent';
import { WorkerDeployment } from './workerDeployment';
import { WorkerDeploymentPromotion } from './workerDeploymentPromotion';
import { TaskSchedule } from './taskSchedule';
import { TaskScheduleInstance } from './taskScheduleInstance';
import { RuntimeEnvironmentSession } from './runtimeEnvironmentSession';
import { ProjectAlertChannel } from './projectAlertChannel';
import { ProjectAlert } from './projectAlert';
import { ProjectAlertStorage } from './projectAlertStorage';
import { OrganizationIntegration } from './organizationIntegration';
import { BulkActionGroup } from './bulkActionGroup';
import { BulkActionItem } from './bulkActionItem';

export const lists = {
  User,
  InvitationCode,
  AuthorizationCode,
  PersonalAccessToken,
  Organization,
  ExternalAccount,
  IntegrationAuthMethod,
  IntegrationDefinition,
  Integration,
  IntegrationConnection,
  ConnectionAttempt,
  OrgMember,
  OrgMemberInvite,
  RuntimeEnvironment,
  Project,
  Endpoint,
  EndpointIndex,
  Job,
  JobVersion,
  EventExample,
  ConcurrencyLimitGroup,
  JobQueue,
  JobAlias,
  JobIntegration,
  RunConnection,
  DynamicTrigger,
  EventDispatcher,
  EventRecord,
  JobRun,
  JobCounter,
  JobRunAutoYieldExecution,
  JobRunSubscription,
  JobRunExecution,
  Task,
  TaskAttempt,
  JobRunStatusRecord,
  SecretReference,
  SecretStore,
  TriggerSource,
  TriggerSourceOption,
  Webhook,
  WebhookEnvironment,
  WebhookRequestDelivery,
  WebhookDeliveryCounter,
  DynamicTriggerRegistration,
  HttpSourceRequestDelivery,
  ScheduleSource,
  TriggerHttpEndpoint,
  TriggerHttpEndpointEnvironment,
  KeyValueItem,
  MissingConnection,
  ApiIntegrationVote,
  DataMigration,
  DeferredScheduledEventService,
  BackgroundWorker,
  BackgroundWorkerTask,
  TaskRun,
  TaskRunDependency,
  TaskRunCounter,
  TaskRunNumberCounter,
  TaskTag,
  TaskRunAttempt,
  TaskEvent,
  TaskQueue,
  BatchTaskRun,
  BatchTaskRunItem,
  EnvironmentVariable,
  EnvironmentVariableValue,
  Checkpoint,
  CheckpointRestoreEvent,
  WorkerDeployment,
  WorkerDeploymentPromotion,
  TaskSchedule,
  TaskScheduleInstance,
  RuntimeEnvironmentSession,
  ProjectAlertChannel,
  ProjectAlert,
  ProjectAlertStorage,
  OrganizationIntegration,
  BulkActionGroup,
  BulkActionItem
}
