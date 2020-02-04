import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs/internal/observable/of';
import createSpy = jasmine.createSpy;

import { CostCenterAdapter } from './cost-center.adapter';
import { CostCenterConnector } from './cost-center.connector';
import { B2BSearchConfig } from '../../model/search-config';

const userId = 'userId';
const costCenterCode = 'costCenterCode';

const costCenter = {
  code: costCenterCode,
};

class MockCostCenterAdapter implements CostCenterAdapter {
  load = createSpy('CostCenterAdapter.load').and.returnValue(of(costCenter));
  loadList = createSpy('CostCenterAdapter.loadList').and.returnValue(
    of([costCenter])
  );
  create = createSpy('CostCenterAdapter.create').and.returnValue(
    of(costCenter)
  );
  update = createSpy('CostCenterAdapter.update').and.returnValue(
    of(costCenter)
  );
}

describe('CostCenterConnector', () => {
  let service: CostCenterConnector;
  let adapter: CostCenterAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CostCenterConnector,
        { provide: CostCenterAdapter, useClass: MockCostCenterAdapter },
      ],
    });

    service = TestBed.get(CostCenterConnector as Type<CostCenterConnector>);
    adapter = TestBed.get(CostCenterAdapter as Type<CostCenterAdapter>);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load costCenter', () => {
    service.get(userId, costCenterCode);
    expect(adapter.load).toHaveBeenCalledWith(userId, costCenterCode);
  });

  it('should load costCenters', () => {
    const params: B2BSearchConfig = { sort: 'code' };
    service.getList(userId, params);
    expect(adapter.loadList).toHaveBeenCalledWith(userId, params);
  });

  it('should create costCenter', () => {
    service.create(userId, costCenter);
    expect(adapter.create).toHaveBeenCalledWith(userId, costCenter);
  });

  it('should update costCenter', () => {
    service.update(userId, costCenterCode, costCenter);
    expect(adapter.update).toHaveBeenCalledWith(
      userId,
      costCenterCode,
      costCenter
    );
  });
});
