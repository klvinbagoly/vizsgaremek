import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistInfoEditorComponent } from './artist-info-editor.component';

describe('ArtistInfoEditorComponent', () => {
  let component: ArtistInfoEditorComponent;
  let fixture: ComponentFixture<ArtistInfoEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistInfoEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistInfoEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
