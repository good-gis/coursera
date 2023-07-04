import { DebugElement, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

import { SearchComponent } from "./search.component";

describe("SearchComponent", () => {
    let component: SearchComponent;
    let fixture: ComponentFixture<SearchComponent>;

    beforeEach(() => {
        void TestBed.configureTestingModule({
            declarations: [SearchComponent],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();

        fixture = TestBed.createComponent(SearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should call the search method once by click to the search btn", () => {
        const onClickSearchSpy = jest.spyOn(component, "onClickSearch");

        const searchButton: DebugElement = fixture.debugElement.query(By.css("[data-automation-id='search-button']"));

        searchButton.triggerEventHandler("click");

        expect(onClickSearchSpy).toHaveBeenCalledTimes(1);
    });
});
