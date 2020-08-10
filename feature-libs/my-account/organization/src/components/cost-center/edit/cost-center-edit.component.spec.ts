import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { CostCenter, I18nTestingModule, RoutingService } from '@spartacus/core';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { IconTestingModule } from 'projects/storefrontlib/src/cms-components/misc/icon/testing/icon-testing.module';
import { SplitViewTestingModule } from 'projects/storefrontlib/src/shared/components/split-view/testing/spit-view-testing.module';
import { of } from 'rxjs';
import { CurrentCostCenterService } from '../current-cost-center.service';
import { CostCenterEditComponent } from './cost-center-edit.component';
import { CostCenterService } from '../../../core/services/cost-center.service';

import createSpy = jasmine.createSpy;

@Component({
  selector: 'cx-cost-center-form',
  template: '',
})
class MockCostCenterFormComponent {
  @Input() form;
}

const costCenterCode = 'b1';

const mockCostCenter: CostCenter = {
  code: costCenterCode,
  name: 'costCenter1',
  currency: {
    symbol: '$',
    isocode: 'USD',
  },
  unit: { name: 'orgName', uid: 'orgCode' },
};

class MockCurrentCostCenterService
  implements Partial<CurrentCostCenterService> {
  code$ = of(costCenterCode);
}

class MockCostCenterService implements Partial<CostCenterService> {
  update = createSpy('update');
  load = createSpy('load');
  get = createSpy('get').and.returnValue(of(mockCostCenter));
}

const mockRouterState = {
  state: {
    params: {
      code: costCenterCode,
    },
  },
};

class MockRoutingService {
  go = createSpy('go').and.stub();
  getRouterState = createSpy('getRouterState').and.returnValue(
    of(mockRouterState)
  );
}

describe('CostCenterEditComponent', () => {
  let component: CostCenterEditComponent;
  let fixture: ComponentFixture<CostCenterEditComponent>;
  let costCenterService: CostCenterService;
  let routingService: RoutingService;
  let saveButton;
  let costCenterFormComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule,
        I18nTestingModule,
        UrlTestingModule,
        SplitViewTestingModule,
        IconTestingModule,
        ReactiveFormsModule,
      ],
      declarations: [CostCenterEditComponent, MockCostCenterFormComponent],
      providers: [
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: CostCenterService, useClass: MockCostCenterService },
        {
          provide: CurrentCostCenterService,
          useClass: MockCurrentCostCenterService,
        },
      ],
    }).compileComponents();

    costCenterService = TestBed.inject(CostCenterService);

    routingService = TestBed.inject(RoutingService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostCenterEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    saveButton = fixture.debugElement.query(By.css('button[type=submit]'));
    costCenterFormComponent = fixture.debugElement.query(
      By.css('cx-cost-center-form')
    ).componentInstance;
  });

  // not sure why this is needed, but we're failing otherwise
  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('save valid form', () => {
    it('should disable form on save ', () => {
      saveButton.nativeElement.click();
      expect(costCenterFormComponent.form.disabled).toBeTruthy();
    });

    it('should create cost center', () => {
      saveButton.nativeElement.click();
      expect(costCenterService.update).toHaveBeenCalled();
    });

    it('should navigate to the detail page', () => {
      saveButton.nativeElement.click();
      expect(routingService.go).toHaveBeenCalledWith({
        cxRoute: 'costCenterDetails',
        params: costCenterFormComponent.form.value,
      });
    });
  });

  it('should trigger reload of cost center model on each code change', () => {
    expect(costCenterService.load).toHaveBeenCalledWith(mockCostCenter.code);
  });
});
