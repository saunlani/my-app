import { Component, ViewChild, AfterViewInit, ElementRef, ViewEncapsulation } from '@angular/core';
import { jqxTreeGridComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxtreegrid';
import { TREE_DATA } from './tree-data';
import { isArray } from 'util';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class AppComponent {
    @ViewChild('myTreeGrid') myTreeGrid: jqxTreeGridComponent;

    height: number = 25;
    data = TREE_DATA;
    filterValue: any;
    expandThisKey: string;
    expandTheseKeys: any[] = [];
    selectedNode: any;

    //for details button
    nodeTenantName: string;
    nodeEffectiveStart: string;
    nodeEffectiveEnd: string;
    nodeRootDomain: string;

    rowKey: number;

    //for selecting rows
    value: string[];

    //user created counter
    userCreatedNodeCount: number = 0;

    ngAfterViewInit(): void {
        this.expandThisKey = 'AAAAAAAJGMU';
        this.expandThisKey = this.expandThisKey.replace(/[^A-Za-z0-9]/g, '');
        this.expandTheseKeys.push(this.expandThisKey);
        this.myTreeGrid.expandRow(this.expandTheseKeys);
        this.myTreeGrid.hideColumn('RootDomain');
        this.myTreeGrid.hideColumn('EfctvStartDt');
        this.myTreeGrid.hideColumn('EfctvEndDt');

    }

    filter(event: any): void {
        this.myTreeGrid.collapseAll();
        if (this.filterValue.length < 1) {
            this.myTreeGrid.collapseAll();
            this.myTreeGrid.expandRow(this.expandTheseKeys);
        }
        else {
            this.myTreeGrid.expandRow(this.filterValue);
            this.myTreeGrid.expandAll();
        }
    }

    RowSelect(event: any): void {
        this.selectedNode = this.myTreeGrid.getRow(this.rowKey.toString());
        console.log(this.selectedNode);
        this.value = this.myTreeGrid.getSelection();
    }

    delete() {
        let deleteNode = this.selectedNode.daTableRowId.toString();
        deleteNode = deleteNode.replace(/[^A-Za-z0-9]/g, '');
        this.myTreeGrid.deleteRow(deleteNode);
    }

    source: any =
        {
            dataType: 'json',
            datafields: [
                { name: 'daTableRowId', type: 'string' },
                { name: 'TenantTaxnmyName', type: 'string' },
                { name: 'RootDomain', type: 'string' },
                { name: 'EfctvStartDt', type: 'string' },
                { name: 'EfctvEndDt', type: 'string' },
                { name: 'children', type: 'array' }
            ],
            hierarchy:
            {
                root: "children"
            },
            id: 'daTableRowId',
            localData: this.data
        };

    dataAdapter: any = new jqx.dataAdapter(this.source);
    columns: any[] = [
        { text: 'Tenant Name', dataField: 'TenantTaxnmyName', width: "90%" },
        { text: 'Root Domain', dataField: 'RootDomain'}
        { text: 'Effective Start Date', dataField: 'EfctvStartDt'}
        { text: 'Effective End Date', dataField: 'EfctvEndDt'}
        {
            text: 'Details', columntype: 'button', editable: false, sortable: false, filterable: false, width: "10%", align: "center",

            cellsrenderer: (row: number): string => { return '<div align="center"> <button class="detailsButton" style="cursor: pointer; text-indent: -3.5px; border-radius: 50%; background-color: #1F93A1; color: white; height: 17px; width: 17px; line-height: .1; font-size: 12px; ">&#129138;</button></div>' },
        },
    ];

    rendered = (): void => {
        let detailsButtons = jqwidgets.createInstance('.detailsButton', 'jqxButton');
        var cloneOfA = JSON.parse(JSON.stringify(detailsButtons));

        if (!isArray(detailsButtons)) {
            let button = detailsButtons;
            detailsButtons = [];
            detailsButtons.push(button);
        }

        let flattenCancelButtons = flatten(detailsButtons);

        function flatten(arr: any[]): any[] {
            if (arr.length) {
                return arr.reduce((flat: any[], toFlatten: any[]): any[] => {
                    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
                }, []);
            }
        }

        for (let i = 0; i < flattenCancelButtons.length; i++) {
            flattenCancelButtons[i].addEventHandler('click', (event: any): void => {
                this.editClick(event);
            });
        }
    }

    rowClick(event: any): void {
        this.rowKey = event.args.key;
    };

    //editing 
    editClick(event) {
        let row = this.myTreeGrid.getRow(this.rowKey.toString());
        this.nodeTenantName = JSON.stringify(row["TenantTaxnmyName"]).replace(/['"]+/g, '');
        this.nodeEffectiveStart = JSON.stringify(row["EfctvStartDt"]).replace(/['"]+/g, '');
        this.nodeEffectiveEnd = JSON.stringify(row["EfctvEndDt"]).replace(/['"]+/g, '');
        this.nodeRootDomain = JSON.stringify(row["RootDomain"]).replace(/['"]+/g, '');
        let editDialog: any = <any>document.getElementById("editDialog");
        editDialog.showModal();
    }

    submitEdit() {
        let tenantName: string = (<HTMLInputElement>document.getElementById("tenantName")).value;
        let startDate: string = (<HTMLInputElement>document.getElementById("startDate")).value;
        let endDate: string = (<HTMLInputElement>document.getElementById("endDate")).value;
        let rootDomain: string = (<HTMLInputElement>document.getElementById("rootDomain")).value;
        this.myTreeGrid.updateRow(this.selectedNode.daTableRowId.toString().replace(/[^A-Za-z0-9]/g, ''), { 'RootDomain': rootDomain , 'TenantTaxnmyName': tenantName, 'EfctvStartDt': startDate, 'EfctvEndDt': endDate });
        let editDialog: any = <any>document.getElementById("editDialog");
        editDialog.close();
    }


    //adding account(child)
    addAccountClick(event) {
        let row = this.myTreeGrid.getRow(this.rowKey.toString());
        let addAccountDialog: any = <any>document.getElementById("addAccountDialog");
        addAccountDialog.showModal();
    }

    submitAccountAdd() {
        let tenantName: string = (<HTMLInputElement>document.getElementById("tenantName1")).value;
        let startDate: string = (<HTMLInputElement>document.getElementById("startDate1")).value;
        let endDate: string = (<HTMLInputElement>document.getElementById("endDate1")).value;
        let rootDomain: string = (<HTMLInputElement>document.getElementById("rootDomain1")).value;
        this.userCreatedNodeCount++;
        let selectedNodeRowID = this.selectedNode.daTableRowId.toString();
        selectedNodeRowID = selectedNodeRowID.replace(/[^A-Za-z0-9]/g, '');
        this.myTreeGrid.addRow('userCreated' + this.userCreatedNodeCount, { 'TenantTaxnmyName': tenantName, 'EfctvStartDt': startDate, 'EfctvEndDt': endDate, 'RootDomain': rootDomain, 'daTableRowId': 'userCreated' + this.userCreatedNodeCount }, 'Global', selectedNodeRowID);
        let addAccountDialog: any = <any>document.getElementById("addAccountDialog");
        addAccountDialog.close();
    }

    //adding tenant(sibling)
    addTenantClick(event) {
        let row = this.myTreeGrid.getRow(this.rowKey.toString());
        let addTenantDialog: any = <any>document.getElementById("addTenantDialog");
        addTenantDialog.showModal();
    }

    submitTenantAdd() {
        let tenantName: string = (<HTMLInputElement>document.getElementById("tenantName2")).value;
        let startDate: string = (<HTMLInputElement>document.getElementById("startDate2")).value;
        let endDate: string = (<HTMLInputElement>document.getElementById("endDate2")).value;
        let rootDomain: string = (<HTMLInputElement>document.getElementById("rootDomain2")).value;
        this.userCreatedNodeCount++;
        let parentNodeID = this.selectedNode['parent'].daTableRowId
        parentNodeID = parentNodeID.replace(/[^A-Za-z0-9]/g, '');
        this.myTreeGrid.addRow('userCreated' + this.userCreatedNodeCount, { 'TenantTaxnmyName': tenantName, 'EfctvStartDt': startDate, 'EfctvEndDt': endDate, 'RootDomain': rootDomain, 'daTableRowId': 'userCreated' + this.userCreatedNodeCount }, 'Global', parentNodeID);
        let addTenantDialog: any = <any>document.getElementById("addTenantDialog");
        addTenantDialog.close();
    }


    getWidth(): any {
        if (document.body.offsetWidth < 700) {
            return '90%';
        }

        return 700;
    }
}

// let myDialog:any = <any>document.getElementById("myDialog");
