import {Component, Input, OnInit} from '@angular/core';
import {ProfileEnterprise} from "../../../models/profile-enterprise";
import {ProfileEnterpriseOfAdminService} from "../../../services/profile-enterprise-of-admin.service";
import {MatDialog} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {DialogSuccessComponent} from "../../../notification/dialog-success/dialog-success.component";
import {DialogFailComponent} from "../../../notification/dialog-fail/dialog-fail.component";


@Component({
  selector: 'app-list-enterprise-of-admin',
  templateUrl: './list-enterprise-of-admin.component.html',
  styleUrls: ['./list-enterprise-of-admin.component.css'],

})
export class ListEnterpriseOfAdminComponent implements OnInit {
  closeResult!: string;
  enterprise!: ProfileEnterprise[]

  constructor(private enterpriseOfAdminService: ProfileEnterpriseOfAdminService,
              public dialog: MatDialog,
              private toarts: ToastrService,
              private router: Router,

  ) {
  }

  ngOnInit(): void {
    this.enterpriseOfAdminService.getAll().subscribe(result => {
      // @ts-ignore
      this.enterprise = result
      console.log(result)
    }, error => {
      console.log(error)
    })
  }

  changeStatusLock(id: any) {
    this.enterpriseOfAdminService.changeStatusLock(id).subscribe(result => {
      console.log(result)
      this.router.navigateByUrl("/admin/list").then()
      this.ngOnInit()
      this.openDialogSuccess()
    }, error => {
      console.log("Lỗi", error)
      this.openDialogFail()
    })
  }

  changeStatusActive(id: any) {
    this.enterpriseOfAdminService.changeStatusActive(id).subscribe(result => {
      console.log(result)
      this.router.navigateByUrl("/admin/list").then()
      this.ngOnInit()
      this.openDialogSuccess()
    }, error => {
      console.log("Lỗi", error)
      this.openDialogFail()
    })
  }

  openToartSuccess() {
    this.toarts.success('mes', 'title')
  }

  openToartError() {
    this.toarts.error('mes', 'title')
  }

  openToartInFor() {
    this.toarts.info('mes', 'title')
  }

  openDialogSuccess() {
    this.dialog.open(DialogSuccessComponent);
  }

  openDialogFail() {
    this.dialog.open(DialogFailComponent);
  }
}
