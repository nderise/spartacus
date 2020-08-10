import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import {
  OccB2BUserNormalizer,
  OccBudgetListNormalizer,
  OccBudgetNormalizer,
  OccCostCenterListNormalizer,
  OccCostCenterNormalizer,
  OccOrgUnitAddressListNormalizer,
  OccOrgUnitAddressNormalizer,
  OccOrgUnitApprovalProcessNormalizer,
  OccOrgUnitNodeListNormalizer,
  OccOrgUnitNodeNormalizer,
  OccOrgUnitNormalizer,
  OccPermissionListNormalizer,
  OccPermissionNormalizer,
  OccPermissionTypeListNormalizer,
  OccUserGroupListNormalizer,
  OccUserGroupNormalizer,
  OccUserListNormalizer,
  OccOrderApprovalDecisionNormalizer,
  OccOrderApprovalListNormalizer,
  OccOrderApprovalNormalizer,
} from './converters/index';
import { OccPermissionTypeNormalizer } from './converters/occ-permission-type-normalizer';
import { defaultOccOrganizationConfig } from './default-occ-organization-config';
import { OccB2BUserAdapter } from './occ-b2b-users.adapter';
import { OccBudgetAdapter } from './occ-budget.adapter';
import { OccCostCenterAdapter } from './occ-cost-center.adapter';
import { OccOrgUnitAdapter } from './occ-org-unit.adapter';
import { OccPermissionAdapter } from './occ-permission.adapter';
import { OccUserGroupAdapter } from './occ-user-group.adapter';
import { OccOrderApprovalAdapter } from './occ-order-approval.adapter';
import {
  PERMISSION_NORMALIZER,
  PERMISSION_TYPE_NORMALIZER,
  B2BUserAdapter,
  B2B_USER_NORMALIZER,
  B2B_USERS_NORMALIZER,
  OrderApprovalAdapter,
  ORDER_APPROVAL_NORMALIZER,
  ORDER_APPROVALS_NORMALIZER,
  ORDER_APPROVAL_DECISION_NORMALIZER,
  BudgetAdapter,
  BUDGET_NORMALIZER,
  BUDGETS_NORMALIZER,
  OrgUnitAdapter,
  B2BUNIT_NORMALIZER,
  B2BUNIT_NODE_NORMALIZER,
  B2BUNIT_NODE_LIST_NORMALIZER,
  B2BUNIT_APPROVAL_PROCESSES_NORMALIZER,
  UserGroupAdapter,
  USER_GROUP_NORMALIZER,
  USER_GROUPS_NORMALIZER,
  PermissionAdapter,
  PERMISSIONS_NORMALIZER,
  PERMISSION_TYPES_NORMALIZER,
  CostCenterAdapter,
  COST_CENTER_NORMALIZER,
  COST_CENTERS_NORMALIZER,
  B2B_ADDRESS_NORMALIZER,
  B2B_ADDRESS_LIST_NORMALIZER,
} from '../../../connectors';
import { ConfigModule } from '@spartacus/core';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ConfigModule.withConfig(defaultOccOrganizationConfig),
  ],
  providers: [
    {
      provide: BudgetAdapter,
      useClass: OccBudgetAdapter,
    },
    { provide: BUDGET_NORMALIZER, useClass: OccBudgetNormalizer, multi: true },
    {
      provide: BUDGETS_NORMALIZER,
      useClass: OccBudgetListNormalizer,
      multi: true,
    },
    {
      provide: OrgUnitAdapter,
      useClass: OccOrgUnitAdapter,
    },
    {
      provide: B2BUNIT_NORMALIZER,
      useClass: OccOrgUnitNormalizer,
      multi: true,
    },
    {
      provide: B2BUNIT_NODE_NORMALIZER,
      useClass: OccOrgUnitNodeNormalizer,
      multi: true,
    },
    {
      provide: B2BUNIT_NODE_LIST_NORMALIZER,
      useClass: OccOrgUnitNodeListNormalizer,
      multi: true,
    },
    {
      provide: B2BUNIT_APPROVAL_PROCESSES_NORMALIZER,
      useClass: OccOrgUnitApprovalProcessNormalizer,
      multi: true,
    },
    {
      provide: UserGroupAdapter,
      useClass: OccUserGroupAdapter,
    },
    {
      provide: USER_GROUP_NORMALIZER,
      useClass: OccUserGroupNormalizer,
      multi: true,
    },
    {
      provide: USER_GROUPS_NORMALIZER,
      useClass: OccUserGroupListNormalizer,
      multi: true,
    },
    {
      provide: PermissionAdapter,
      useClass: OccPermissionAdapter,
    },
    {
      provide: PERMISSION_NORMALIZER,
      useClass: OccPermissionNormalizer,
      multi: true,
    },
    {
      provide: PERMISSIONS_NORMALIZER,
      useClass: OccPermissionListNormalizer,
      multi: true,
    },
    {
      provide: PERMISSION_TYPE_NORMALIZER,
      useClass: OccPermissionTypeNormalizer,
      multi: true,
    },
    {
      provide: PERMISSION_TYPES_NORMALIZER,
      useClass: OccPermissionTypeListNormalizer,
      multi: true,
    },
    {
      provide: CostCenterAdapter,
      useClass: OccCostCenterAdapter,
    },
    {
      provide: COST_CENTER_NORMALIZER,
      useClass: OccCostCenterNormalizer,
      multi: true,
    },
    {
      provide: COST_CENTERS_NORMALIZER,
      useClass: OccCostCenterListNormalizer,
      multi: true,
    },
    {
      provide: B2BUserAdapter,
      useClass: OccB2BUserAdapter,
    },
    {
      provide: B2B_USER_NORMALIZER,
      useClass: OccB2BUserNormalizer,
      multi: true,
    },
    {
      provide: B2B_USERS_NORMALIZER,
      useClass: OccUserListNormalizer,
      multi: true,
    },
    {
      provide: B2B_ADDRESS_NORMALIZER,
      useClass: OccOrgUnitAddressNormalizer,
      multi: true,
    },
    {
      provide: B2B_ADDRESS_LIST_NORMALIZER,
      useClass: OccOrgUnitAddressListNormalizer,
      multi: true,
    },
    {
      provide: OrderApprovalAdapter,
      useClass: OccOrderApprovalAdapter,
    },
    {
      provide: ORDER_APPROVAL_NORMALIZER,
      useClass: OccOrderApprovalNormalizer,
      multi: true,
    },
    {
      provide: ORDER_APPROVALS_NORMALIZER,
      useClass: OccOrderApprovalListNormalizer,
      multi: true,
    },
    {
      provide: ORDER_APPROVAL_DECISION_NORMALIZER,
      useClass: OccOrderApprovalDecisionNormalizer,
      multi: true,
    },
  ],
})
export class OrganizationOccModule {}
