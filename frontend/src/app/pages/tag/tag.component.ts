import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TagInfo } from 'src/app/model/tag-info';
import { TagService } from 'src/app/service/tag.service';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {

  admin: boolean = true
  tag: TagInfo | undefined

  constructor(
    private tagService: TagService,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => this.findTag(params['id']))
  }

  findTag(name: string): void {
    this.tagService.getAll().subscribe(tags => {
      this.tag = tags.find(tag => tag.name.toLocaleLowerCase() === name.toLocaleLowerCase())
    })
  }

}
