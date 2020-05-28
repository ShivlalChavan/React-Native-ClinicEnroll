class Patient {

    constructor(id,pateintId,patientName,patientAge,patientMobileNo,reasonId,
                apptDate,isPrescribed,isTakenMedicine,comment,bloodTest,isDocumentAdded,labTestType){
          this.id=id;
         this.pateintId=pateintId;
         this.patientName=patientName;
         this.patientAge=patientAge;
         this.patientMobileNo=patientMobileNo;
         this.reasonId=reasonId;
         this.apptDate=apptDate;
         this.isPrescribed=isPrescribed;
         this.isTakenMedicine=isTakenMedicine;
         this.comment=comment;
         this.bloodTest=bloodTest;
         this.isDocumentAdded=isDocumentAdded;
         this.labTestType=labTestType;
    }

}

export default Patient;