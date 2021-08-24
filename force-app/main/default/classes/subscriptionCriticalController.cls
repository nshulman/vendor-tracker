public class subscriptionCriticalController {
    @AuraEnabled(cacheable=true)
    public static Subscription__c getSubscriptionCriticalInfo(Id recordId) {
        Subscription__c result = [SELECT Id, Critical_Subscription__c, Account__r.Critical_Vendor__c 
            FROM Subscription__c where Id =: recordId];
        return result;
    }

    @AuraEnabled
    public static boolean updateSubscriptionCriticalInfo(Id recordId, Boolean subscriptionCritical, Boolean vendorCritical) {
        Subscription__c sub = [SELECT Id, Critical_Subscription__c, Account__c, Account__r.Critical_Vendor__c 
            FROM Subscription__c where Id =: recordId];
            try {
                // Update subscription setting
                if (sub.Critical_Subscription__c != subscriptionCritical) {
                    sub.Critical_Subscription__c = subscriptionCritical;
                    update sub;
                }
                // Update vendor setting
                if (sub.Account__r.Critical_Vendor__c != vendorCritical) {
                    Account vendor = new Account();
                    vendor.Id = sub.Account__c;
                    vendor.Critical_Vendor__c = vendorCritical;
                    update vendor;
                }
                return true;
            } catch (Exception e) {
                return false;
            }
    }
}
