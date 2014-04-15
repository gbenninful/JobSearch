"use strict";
var JobSearchApp = JobSearchApp || {};

 JobSearchApp.Models =   (function () {
   
    //JOB POSTING
    var JobPosting = function (options) {
        options = options || {};
        this.companyId = companyId,

        this.jobTitle = options.jobTitle || "";
        this.category = options.category || "";
        this.jobId = options.jobId || "";
        this.jobDescription = options.jobDescription || "";
        this.hrEmail = options.hrEmail || "";
    };

    //ADDRESS
    var Address = function (street, city, state, zipCode) {
        this.companyId = companyId,

        this.street = street,
        this.city = city,
        this.state = state,
        this.zipCode = zipCode
    };

    //COMPANY
    var Company = function (name, companyEmail, phone, url) {
        this.name = name,
        this.companyEmail = companyEmail,
        this.phone = phone,
        this.url = url
    };

    return {
        JobPosting: JobPosting,
        Address: Address,
        Company: Company
    };

})();