import React from "react";

import {BrowserRouter as Router, Route} from "react-router-dom";
import Home from "./components/Home";
import Register from "./RegisterPerson";
import WhiteBoardApp from "./components/WhiteBoardApp";
import PatientProfile from "./components/PatientProfile";
import Login from "./components/Login";
import DoctorProfile from "./components/DoctorProfile";
import AdminStaffProfile from "./components/AdminStaffProfile";
import PatientProfileReg from "./components/registrations/PatientProflieReg";
import DoctorProfileReg from "./components/registrations/DoctorProfileReg";
import AdminStaffProfileReg from "./components/registrations/AdminStaffProfileReg";
import PersonAddressReg from "./components/registrations/PersonAddressReg";
import PersonPhoneReg from "./components/registrations/PersonPhoneReg";
import AppointmentReg from "./components/registrations/AppointmentReg";
import PrescriptionReg from "./components/registrations/PrescriptionReg";
import ViewPersonAddrPhone from "./components/views/ViewPersonAddrPhone";
import PatientAllergyReg from "./components/registrations/PatientAllergyReg";
import PatientInsuranceReg from "./components/registrations/PatientInsuranceReg";
import ViewPatientAppointments from "./components/views/ViewPatientAppointments";
import ViewAllergyPatientProfile from "./components/views/ViewAllergyPatientProfile";
import ViewDoctorAppointments from "./components/views/ViewDoctorAppointments";
import ViewPatientInsurance from "./components/views/ViewPatientInsurance";
import ViewDoctorPrescriptions from "./components/views/ViewDoctorPrescriptions";
import ViewPatientPrescriptions from "./components/views/ViewPatientPrescriptions";
import UpdatePatientPersonalData from "./components/updates/UpdatePatientPersonalData";
import DeletePersonAddress from "./components/removes/DeletePersonAddress";
import DeletePersonPhone from "./components/removes/DeletePersonPhone";
import UpdatePersonAddress from "./components/updates/UpdatePersonAddress";
import UpdatePersonPhone from "./components/updates/UpdatePersonPhone";
import UpdateDoctorPersonalData from "./components/updates/UpdateDoctorPersonalData";
import DeletePrescription from "./components/removes/DeletePrescription";
import UpdateAppointment from "./components/updates/UpdateAppointment";
import ViewAllDoctors from "./components/viewAll/ViewAllDoctors";
import UpdatePatientAllergy from "./components/updates/UpdatePatientAllergy";
import UpdatePatientInsurance from "./components/updates/UpdatePatientInsurance";
import ViewAllPatients from "./components/viewAll/ViewAllPatients";
import ViewAllAdminStaff from "./components/viewAll/ViewAllAdminStaff";
import SalaryReg from "./components/registrations/SalaryReg";
import ViewStaffSalary from "./components/views/ViewStaffSalary";
import DeletePatientAllergy from "./components/removes/DeletePatientAllergy";
import DeletePatientInsurance from "./components/removes/DeletePatientInsurance";
import DeleteDoctorAppointment from "./components/removes/DeleteDoctorAppointment";
import ViewAllAddresses from "./components/viewAll/ViewAllAddresses";
import ViewAllPhones from "./components/viewAll/ViewAllPhones";
import ViewAllAppointments from "./components/viewAll/ViewAllAppointments";
import ViewAllPrescriptions from "./components/viewAll/ViewAllPrescriptions";
import ViewAllSalaries from "./components/viewAll/ViewAllSalaries";
import ViewAllAllergies from "./components/viewAll/ViewAllAllergies";
import ViewAllInsurances from "./components/viewAll/ViewAllInsurances";
import DoctorUpdateByAdmin from "./components/adminUpdates/DoctorUpdateByAdmin";
import UpdateAdminStaffPersonalData from "./components/updates/UpdateAdminStaffPersonalData";
import PatientUpdateByAdmin from "./components/adminUpdates/PatientUpdateByAdmin";
import AdminStaffUpdateByAdmin from "./components/adminUpdates/AdminStaffUpdateByAdmin";
import UpdateAddressByAdmin from "./components/adminUpdates/AddressUpdateByAdmin";
import UpdatePhoneByAdmin from "./components/adminUpdates/PhoneUpdateByAdmin";
import AppointmentUpdateByAdmin from "./components/adminUpdates/AppointmentUpdateByAdmin";
import AllergyUpdateByAdmin from "./components/adminUpdates/AllergyUpdateByAdmin";
import InsuranceUpdateByAdmin from "./components/adminUpdates/InsuranceUpdateByAdmin";
import SalaryUpdateByAdmin from "./components/adminUpdates/SalaryUpdateByAdmin";
import AddressRemoveByAdmin from "./components/adminRemoves/AddressRemoveByAdmin";
import PrescriptionRemoveByAdmin from "./components/adminRemoves/PrescriptionRemoveByAdmin";
import AppointmentRemoveByAdmin from "./components/adminRemoves/AppointmentRemoveByAdmin";
import AllergyRemoveByAdmin from "./components/adminRemoves/AllergyRemoveByAdmin";
import InsuranceRemoveByAdmin from "./components/adminRemoves/InsuranceRemoveByAdmin";
import PhoneRemoveByAdmin from "./components/adminRemoves/PhoneRemoveByAdmin";
import DoctorRemoveByAdmin from "./components/adminRemoves/DoctorRemoveByAdmin";
import PatientRemoveByAdmin from "./components/adminRemoves/PatientRemoveByAdmin";

class AppManagerContainer extends React.Component {
    state = {
        layout: 'table',
    }

    render() {
        return (
            <div>
                <Router>
                    <Route
                        path="/"
                        exact={true}
                        component={Home}
                    />

                    <Route
                        path="/register"
                        exact={true}
                        component={Register}
                    />

                    <Route
                        path="/whiteboard"
                        exact={true}
                        component={WhiteBoardApp}
                    />

                    <Route
                        path="/login"
                        exact={true}
                        component={Login}
                    />

                    <Route
                        path="/patientProfile"
                        exact={true}
                        component={PatientProfile}
                    />

                    <Route
                        path="/doctorProfile"
                        exact={true}
                        component={DoctorProfile}
                    />

                    <Route
                        path="/adminStaffProfile"
                        exact={true}
                        component={AdminStaffProfile}
                    />

                    <Route
                        path="/patientProfileReg"
                        exact={true}
                        component={PatientProfileReg}
                    />

                    <Route
                        path="/doctorProfileReg"
                        exact={true}
                        component={DoctorProfileReg}
                    />

                    <Route
                        path="/adminStaffProfileReg"
                        exact={true}
                        component={AdminStaffProfileReg}
                    />

                    <Route
                        path="/addAddress"
                        exact={true}
                        component={PersonAddressReg}
                    />

                    <Route
                        path="/addPhone"
                        exact={true}
                        component={PersonPhoneReg}
                    />

                    <Route
                        path="/addAppointment"
                        exact={true}
                        component={AppointmentReg}
                    />

                    <Route
                        path="/addPrescription"
                        exact={true}
                        component={PrescriptionReg}
                    />

                    <Route
                        path="/viewAllergyPatientProfile"
                        exact={true}
                        component={ViewAllergyPatientProfile}
                    />

                    <Route
                        path="/viewPersonAddrPhone"
                        exact={true}
                        component={ViewPersonAddrPhone}
                    />

                    <Route
                        path="/viewDoctorAppointments"
                        exact={true}
                        component={ViewDoctorAppointments}
                    />

                    <Route
                        path="/viewDoctorPrescriptions"
                        exact={true}
                        component={ViewDoctorPrescriptions}
                    />

                    <Route
                        path="/viewPatientInsurances"
                        exact={true}
                        component={ViewPatientInsurance}
                    />


                    <Route
                        path="/addAllergy"
                        exact={true}
                        component={PatientAllergyReg}
                    />

                    <Route
                        path="/addInsurance"
                        exact={true}
                        component={PatientInsuranceReg}
                    />

                    <Route
                        path="/viewPatientAppointments"
                        exact={true}
                        component={ViewPatientAppointments}
                    />

                    <Route
                        path="/viewPatientPrescriptions"
                        exact={true}
                        component={ViewPatientPrescriptions}
                    />

                    <Route
                        path="/updatePatientPersonalProfile"
                        exact={true}
                        component={UpdatePatientPersonalData}
                    />

                    <Route
                        path="/updateDoctorPersonalProfile"
                        exact={true}
                        component={UpdateDoctorPersonalData}
                    />

                    <Route
                        path="/updateDoctorPersonalProfile"
                        exact={true}
                        component={UpdateDoctorPersonalData}
                    />

                    <Route
                        path="/updateAdminStaffPersonalProfile"
                        exact={true}
                        component={UpdateAdminStaffPersonalData}
                    />

                    <Route
                        path="/updatePersonPhone"
                        exact={true}
                        component={UpdatePersonPhone}
                    />

                    <Route
                        path="/updatePersonAddress"
                        exact={true}
                        component={UpdatePersonAddress}
                    />

                    <Route
                        path="/updateAppointment"
                        exact={true}
                        component={UpdateAppointment}
                    />

                    <Route
                        path="/deletePersonAddress"
                        exact={true}
                        component={DeletePersonAddress}
                    />

                    <Route
                        path="/deletePersonPhone"
                        exact={true}
                        component={DeletePersonPhone}
                    />

                    <Route
                        path="/deletePrescription"
                        exact={true}
                        component={DeletePrescription}
                    />

                    <Route
                        path="/viewAllDoctors"
                        exact={true}
                        component={ViewAllDoctors}
                    />

                    <Route
                        path="/viewAllAdminStaff"
                        exact={true}
                        component={ViewAllAdminStaff}
                    />

                    <Route
                        path="/viewAllPatients"
                        exact={true}
                        component={ViewAllPatients}
                    />

                    <Route
                        path="/updatePatientAllergy"
                        exact={true}
                        component={UpdatePatientAllergy}
                    />

                    <Route
                        path="/updatePatientInsurance"
                        exact={true}
                        component={UpdatePatientInsurance}
                    />

                    <Route
                        path="/addSalary"
                        exact={true}
                        component={SalaryReg}
                    />

                    <Route
                        path="/viewSalary"
                        exact={true}
                        component={ViewStaffSalary}
                    />

                    <Route
                        path="/deletePatientAllergy"
                        exact={true}
                        component={DeletePatientAllergy}
                    />

                    <Route
                        path="/deletePatientInsurance"
                        exact={true}
                        component={DeletePatientInsurance}
                    />

                    <Route
                        path="/deleteDoctorAppointment"
                        exact={true}
                        component={DeleteDoctorAppointment}
                    />

                    <Route
                        path="/viewAllAddresses"
                        exact={true}
                        component={ViewAllAddresses}
                    />

                    <Route
                        path="/viewAllPhones"
                        exact={true}
                        component={ViewAllPhones}
                    />

                    <Route
                        path="/viewAllAppointments"
                        exact={true}
                        component={ViewAllAppointments}
                    />

                    <Route
                        path="/viewAllPrescriptions"
                        exact={true}
                        component={ViewAllPrescriptions}
                    />

                    <Route
                        path="/viewAllSalaries"
                        exact={true}
                        component={ViewAllSalaries}
                    />

                    <Route
                        path="/viewAllAllergies"
                        exact={true}
                        component={ViewAllAllergies}
                    />

                    <Route
                        path="/viewAllInsurances"
                        exact={true}
                        component={ViewAllInsurances}
                    />

                    <Route
                        path="/updateDoctorByAdmin"
                        exact={true}
                        component={DoctorUpdateByAdmin}
                    />

                    <Route
                        path="/updatePatientByAdmin"
                        exact={true}
                        component={PatientUpdateByAdmin}
                    />

                    <Route
                        path="/updateAdminStaffByAdmin"
                        exact={true}
                        component={AdminStaffUpdateByAdmin}
                    />

                    <Route
                        path="/updateAddressByAdmin"
                        exact={true}
                        component={UpdateAddressByAdmin}
                    />

                    <Route
                        path="/updatePhoneByAdmin"
                        exact={true}
                        component={UpdatePhoneByAdmin}
                    />

                    <Route
                        path="/updateAppointmentByAdmin"
                        exact={true}
                        component={AppointmentUpdateByAdmin}
                    />

                    <Route
                        path="/updateAllergiesByAdmin"
                        exact={true}
                        component={AllergyUpdateByAdmin}
                    />

                    <Route
                        path="/updateInsurancesByAdmin"
                        exact={true}
                        component={InsuranceUpdateByAdmin}
                    />

                    <Route
                        path="/updateSalaryByAdmin"
                        exact={true}
                        component={SalaryUpdateByAdmin}
                    />

                    <Route
                        path="/removeAddressByAdmin"
                        exact={true}
                        component={AddressRemoveByAdmin}
                    />

                    <Route
                         path="/prescriptionRemoveByAdmin"
                         exact={true}
                         component={PrescriptionRemoveByAdmin}
                     />

                    <Route
                        path="/appointmentRemoveByAdmin"
                        exact={true}
                        component={AppointmentRemoveByAdmin}
                    />

                    <Route
                        path="/allergyRemoveByAdmin"
                        exact={true}
                        component={AllergyRemoveByAdmin}
                    />

                    <Route
                        path="/insuranceRemoveByAdmin"
                        exact={true}
                        component={InsuranceRemoveByAdmin}
                    />

                    <Route
                        path="/phoneRemoveByAdmin"
                        exact={true}
                        component={PhoneRemoveByAdmin}
                    />

                    <Route
                        path="/doctorRemoveByAdmin"
                        exact={true}
                        component={DoctorRemoveByAdmin}
                    />

                    <Route
                        path="/patientRemoveByAdmin"
                        exact={true}
                        component={PatientRemoveByAdmin}
                    />

                </Router>
            </div>
        )
    }
}

export default AppManagerContainer