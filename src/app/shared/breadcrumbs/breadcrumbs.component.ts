import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  label: string = '';

  constructor(
    public router: Router,
    public titulo: Title,
    public meta: Meta
  ) {

    this.getDataRoute().subscribe( data => {
          this.label = data.titulo;
          this.titulo.setTitle( this.label );

          let metaTag: MetaDefinition = {
            name: 'description',
            content: this.label
          };

          this.meta.updateTag( metaTag );
        } );
  }

  ngOnInit() {
  }

  getDataRoute() {
    return this.router.events
      .filter((evento) => evento instanceof ActivationEnd)
      .filter((evento: ActivationEnd) => evento.snapshot.firstChild === null)
      .map((evento: ActivationEnd) => evento.snapshot.data);
  }

}
