import { LightningElement, api, wire } from 'lwc';
import getInfo from '@salesforce/apex/subscriptionCriticalController.getSubscriptionCriticalInfo';
import updateInfo from '@salesforce/apex/subscriptionCriticalController.updateSubscriptionCriticalInfo';

export default class SubscriptionCriticalToggle extends LightningElement {
    @api message;
    @api recordId;
    vendorCritical;
    subscriptionCritical;
    subscription;
    error;

    @wire(getInfo, {recordId: '$recordId'})
    wiredCriticalInfo({error, data}) {
        if (data) {
            console.log('got data', data);
            this.vendorCritical = data.Account__r.Critical_Vendor__c;
            this.subscriptionCritical = data.Critical_Subscription__c;
            this.subscription = data;
        } else if (error) {
            console.log('got error', error);
        }
    }

    handleVendorClick(e) {
        this.vendorCritical = !this.vendorCritical;
        this.saveChanges();
    }

    handleSubscriptionClick(e) {
        this.subscriptionCritical = !this.subscriptionCritical;
        this.saveChanges();
    }

    saveChanges() {
        updateInfo({recordId: this.recordId, subscriptionCritical: this.subscriptionCritical, vendorCritical: this.vendorCritical})
            .then(result => {
                console.log('saved',result);
            })
    }

}