import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { UserService } from './../../shared/core/user.service';
import { LoaderService } from './../../shared/core/loader.service';
import { AuthService } from './../../shared/core/auth.service';

import * as _ from 'lodash';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    userData: any;
    userAttributes: Attribute[];
    userEmail = { code: '', value: '', validation: '' };
    userVerificationStatus = '';
    referalId = '';
    copyHelp = '';
    isCopied1 = false;

    isEmailVerified = false;
    isAccountVerified = 0;

    referrersData: any = {
        Status0: 0,
        Status2: 0,
        Status6: 0,
        Status10: 0
    };

    staticData: any = {
        Status0: 0,
        Status2: 0,
        Status6: 0,
        Status10: 0
    };

    constructor(
        private loaderService: LoaderService,
        private userService: UserService,
        private authService: AuthService
    ) {}

    ngOnInit() {
        this.loaderService.display(true);

        this.getData();
        this.getReferrers();
        this.getStaticData();
    }

    fillData() {
        this.userAttributes = this.userData.attrs;
        this.userEmail = _.find(this.userData.attrs, {
            code: AttributeTypes.Email
        });

        this.checkBitMask(this.userData.status);
        this.referalId =
            'https://user.airexe.io/registration?referral=' +
            this.authService.getUserInfo().userId;
    }

    copied() {
        this.copyHelp = 'ID copied';
    }

    getData() {
        this.userService
            .getUser()
            .then(data => {
                this.userData = JSON.parse(data['_body']);
                this.fillData();
                this.loaderService.display(false);
            })
            .catch(err => {
                this.loaderService.display(false);
            });
    }

    getReferrers() {
        this.userService
            .getReferrers()
            .then(data => {
                const body = JSON.parse(data['_body']);
                this.referrersData.Status0 =
                    _.find(body, { status: 0 }) === undefined
                        ? 0
                        : _.find(body, { status: 0 }).count;
                this.referrersData.Status2 =
                    _.find(body, { status: 2 }) === undefined
                        ? 0
                        : _.find(body, { status: 2 }).count;
                this.referrersData.Status6 =
                    _.find(body, { status: 6 }) === undefined
                        ? 0
                        : _.find(body, { status: 6 }).count;
                this.referrersData.Status10 =
                    _.find(body, { status: 10 }) === undefined
                        ? 0
                        : _.find(body, { status: 10 }).count;
            })
            .catch(err => {
                console.log(err);
            });
    }

    getStaticData() {
        this.userService
            .getStaticData()
            .then(data => {
                const body = JSON.parse(data['_body']);

                this.staticData.Status0 =
                    _.find(body, { status: 0 }) === undefined
                        ? 0
                        : _.find(body, { status: 0 }).airx;
                this.staticData.Status2 =
                    _.find(body, { status: 2 }) === undefined
                        ? 0
                        : _.find(body, { status: 2 }).airx;
                this.staticData.Status6 =
                    _.find(body, { status: 6 }) === undefined
                        ? 0
                        : _.find(body, { status: 6 }).airx;
                this.staticData.Status10 =
                    _.find(body, { status: 10 }) === undefined
                        ? 0
                        : _.find(body, { status: 10 }).airx;


            })
            .catch(err => {
                console.log(err);
            });
    }

    checkBitMask(value) {
        switch (value) {
            case 0:
                this.isEmailVerified = false;
                this.isAccountVerified = 0;
                break;
            case 2:
                this.isEmailVerified = true;
                this.isAccountVerified = 0;
                break;
            case 6:
                this.isEmailVerified = true;
                this.isAccountVerified = 2;
                break;
            case 10:
                this.isEmailVerified = true;
                this.isAccountVerified = 1;
                break;
        }
    }
}
enum AttributeTypes {
    Email = '1050'
}

export class Attribute {
    constructor(
        private code: string,
        private value: string,
        private validation: string
    ) {}
}
