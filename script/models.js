"use strict";
var JobSearchApp = JobSearchApp || {};

JobSearchApp.Models = (function () {

    //COMPANY
    var Company = function (options) {
        options = options || {};
        this.name = options.name || "";
        this.companyEmail = options.companyEmail || "";
        this.phone = options.phone || "";
        this.url = options.url || ""
    };

    //JOB POSTING
    var JobPosting = function (options) {
        options = options || {};
        this.companyId = options.companyId || "";
        this.jobTitle = options.jobTitle || "";
        this.category = options.category || "";
        this.jobDescription = options.jobDescription || "";
        this.hrEmail = options.hrEmail || "";
    };

    //ADDRESS
    var Address = function (options) {
        options = options || {};
        this.companyId = options.companyId || "";
        this.street = options.street || "";
        this.city = options.city || "";
        this.state = options.state || "";
        this.zipCode = options.zipCode || ""
    };

    return {
        Company: Company,
        JobPosting: JobPosting,
        Address: Address
    };

})();