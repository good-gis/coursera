import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadMoreComponent } from './load-more.component';

describe('LoadMoreComponent', () => {
  let component: LoadMoreComponent;
  let fixture: ComponentFixture<LoadMoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoadMoreComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoadMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the onClickLoadMore method once when the "Load more" button is clicked', () => {
    jest.spyOn(component, 'onClickLoadMore');
    const loadMoreButton =
      fixture.nativeElement.querySelector('.load-more-btn');

    loadMoreButton.click();

    expect(component.onClickLoadMore).toHaveBeenCalledTimes(1);
  });
});
