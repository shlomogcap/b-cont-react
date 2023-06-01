export enum IContractActualStatus {
  None = 'none',
  MissingProjectManagerConfirm = 'missingProjectManagerConfirm',
  MissingSeniorManagerConfirm = 'missingSeniorManagerConfirm',
  InCareOfAccounting = 'inCareOfAccounting',
  InCareOfFinancing = 'inCareOfFinancing',
  MovedToDelayRelease = 'movedToDelayRelease',
  DelayNotReleased = 'delayNotReleased',
  DelayReleased = 'delayReleased',
  LackOfClaimsReceived = 'lackOfClaimsReceived',
}
