export const register = (user) =>
    fetch(`register`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then((res) => res.text())
        .then((text) => text.length ? JSON.parse(text) : {})
        .catch((error) => {
            throw error;
        });

export const login = (user) =>
    fetch(`login`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then((res) => res.text())
        .then((text) => text.length ? JSON.parse(text) : {})
        .catch((error) => {
            throw error;
        });

export const profile = () =>
    fetch(`profile`, {
        method: 'POST',
        credentials: "include"
    }).then(response => response.json())

export const logout = () =>
    fetch(`logout`, {
        method: 'POST',
        credentials: "include"
    })


export const registerPatientInfo = (user) =>
    fetch(`api/patient/create`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then((res) => res.text())
        .then((text) => text.length ? JSON.parse(text) : {})
        .catch((error) => {
            throw error;
        });

export const registerDoctorInfo = (user) =>
    fetch(`api/doctor/create`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then((res) => res.text())
        .then((text) => text.length ? JSON.parse(text) : {})
        .catch((error) => {
            throw error;
        });

export const registerAdminStaffInfo = (user) =>
    fetch(`api/adminStaff/create`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then((res) => res.text())
        .then((text) => text.length ? JSON.parse(text) : {})
        .catch((error) => {
            throw error;
        });

export const registerPersonAddr = (user, username) =>
    fetch(`api/person/address/create/` + username, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then((res) => res.text())
        .then((text) => text.length ? JSON.parse(text) : {})
        .catch((error) => {
            throw error;
        });

export const registerPersonPhone = (user, username) =>
    fetch(`api/person/phone/create/` + username, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then((res) => res.text())
        .then((text) => text.length ? JSON.parse(text) : {})
        .catch((error) => {
            throw error;
        });

export const registerAppointment = (appointment, docUsername, patUsername) =>
    fetch(`api/doctor/` + docUsername + '/patient/' + patUsername + `/appointment`, {
        method: 'POST',
        body: JSON.stringify(appointment),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then((res) => res.text())
        .then((text) => text.length ? JSON.parse(text) : {})
        .catch((error) => {
            throw error;
        });


export const registerPrescription = (prescription, docUsername, patUsername) =>
    fetch(`api/doctor/` + docUsername + '/patient/' + patUsername + `/prescription`, {
        method: 'POST',
        body: JSON.stringify(prescription),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then((res) => res.text())
        .then((text) => text.length ? JSON.parse(text) : {})
        .catch((error) => {
            throw error;
        });

export const registerMedication = (medicine, docUsername, patUsername, presDate) =>
    fetch("api/doctor/" + docUsername + "/patient/" + patUsername + "/date/" + presDate + "/medication", {
        method: 'POST',
        body: JSON.stringify(medicine),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then((res) => res.text())
        .then((text) => text.length ? JSON.parse(text) : {})
        .catch((error) => {
            throw error;
        });

export const registerMedicalTest = (medicalTest, docUsername, patUsername, presDate) =>
    fetch("api/doctor/" + docUsername + "/patient/" + patUsername + "/date/" + presDate + "/medicalTest", {
        method: 'POST',
        body: JSON.stringify(medicalTest),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then((res) => res.text())
        .then((text) => text.length ? JSON.parse(text) : {})
        .catch((error) => {
            throw error;
        });

export const registerPatientAllergy = (user, username) =>
    fetch(`api/patient/allergy/create/` + username, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then((res) => res.text())
        .then((text) => text.length ? JSON.parse(text) : {})
        .catch((error) => {
            throw error;
        });

export const registerPatientInsurance = (user, username) =>
    fetch(`api/patient/insurance/create/` + username, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then((res) => res.text())
        .then((text) => text.length ? JSON.parse(text) : {})
        .catch((error) => {
            throw error;
        });


export const updatePatientInfo = (user, username) =>
    fetch(`api/patient/update/` + username, {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then((res) => res.text())
        .then((text) => text.length ? JSON.parse(text) : {})
        .catch((error) => {
            throw error;
        });

export const updateDoctorInfo = (user, username) =>
    fetch(`api/doctor/update/` + username, {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then((res) => res.text())
        .then((text) => text.length ? JSON.parse(text) : {})
        .catch((error) => {
            throw error;
        });

export const updateAdminStaffInfo = (user, username) =>
    fetch(`api/adminStaff/update/` + username, {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then((res) => res.text())
        .then((text) => text.length ? JSON.parse(text) : {})
        .catch((error) => {
            throw error;
        });

export const updatePersonAddress = (address, addressID) =>
    fetch(`api/person/update/address/` + addressID, {
        method: 'PUT',
        body: JSON.stringify(address),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then((res) => res.text())
        .then((text) => text.length ? JSON.parse(text) : {})
        .catch((error) => {
            throw error;
        });

export const updatePersonPhone = (phone, phoneId) =>
    fetch(`api/person/update/phone/` + phoneId, {
        method: 'PUT',
        body: JSON.stringify(phone),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then((res) => res.text())
        .then((text) => text.length ? JSON.parse(text) : {})
        .catch((error) => {
            throw error;
        });

export const updateAppointment = (appointment, appointmentId) =>
    fetch(`api/update/appointment/` + appointmentId, {
        method: 'PUT',
        body: JSON.stringify(appointment),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then((res) => res.text())
        .then((text) => text.length ? JSON.parse(text) : {})
        .catch((error) => {
            throw error;
        });

export const updateSalary = (salary, username) =>
    fetch(`api/staff/salary/update/` + username, {
        method: 'PUT',
        body: JSON.stringify(salary),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then((res) => res.text())
        .then((text) => text.length ? JSON.parse(text) : {})
        .catch((error) => {
            throw error;
        });


export const deletePersonAddress = (addressID) =>
    fetch(`api/person/address/` + addressID, {
        method: 'DELETE',
    }).then((res) => res.text())
        .then((text) => text.length ? JSON.parse(text) : {})
        .catch((error) => {
            throw error;
        });

export const deletePersonPhone = (phoneId) =>
    fetch(`api/person/phone/` + phoneId, {
        method: 'DELETE',
    }).then((res) => res.text())
        .then((text) => text.length ? JSON.parse(text) : {})
        .catch((error) => {
            throw error;
        });

export const deletePrescription = (prescriptionId) =>
    fetch(`api/prescription/delete/` + prescriptionId, {
        method: 'DELETE',
    }).then((res) => res.text())
        .then((text) => text.length ? JSON.parse(text) : {})
        .catch((error) => {
            throw error;
        });

export const updatePatientAllergy = (allergy, allergyId) =>
    fetch(`api/patient/update/allergy/` + allergyId, {
        method: 'PUT',
        body: JSON.stringify(allergy),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then((res) => res.text())
        .then((text) => text.length ? JSON.parse(text) : {})
        .catch((error) => {
            throw error;
        });

export const updatePatientInsurance = (insurance, insuranceId) =>
    fetch(`api/patient/update/insurance/` + insuranceId, {
        method: 'PUT',
        body: JSON.stringify(insurance),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then((res) => res.text())
        .then((text) => text.length ? JSON.parse(text) : {})
        .catch((error) => {
            throw error;
        });

export const createSalaryForStaff = (salary, username) =>
    fetch(`api/staff/salary/create/` + username, {
        method: 'POST',
        body: JSON.stringify(salary),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then((res) => res.text())
        .then((text) => text.length ? JSON.parse(text) : {})
        .catch((error) => {
            throw error;
        });

export const deletePatientAllergy = (allergyId) =>
    fetch(`api/patient/delete/allergy/` + allergyId, {
        method: 'DELETE',
    }).then((res) => res.text())
        .then((text) => text.length ? JSON.parse(text) : {})
        .catch((error) => {
            throw error;
        });

export const deletePatientInsurance = (insuranceId) =>
    fetch(`api/patient/delete/insurance/` + insuranceId, {
        method: 'DELETE',
    }).then((res) => res.text())
        .then((text) => text.length ? JSON.parse(text) : {})
        .catch((error) => {
            throw error;
        });

export const deleteDoctorAppointments = (appointmentId) =>
    fetch(`api/appointment/delete/` + appointmentId, {
        method: 'DELETE',
    }).then((res) => res.text())
        .then((text) => text.length ? JSON.parse(text) : {})
        .catch((error) => {
            throw error;
        });

export const deleteDoctor = (doctorId) =>
    fetch(`api/doctor/delete/` + doctorId, {
        method: 'DELETE',
    }).then((res) => res.text())
        .then((text) => text.length ? JSON.parse(text) : {})
        .catch((error) => {
            throw error;
        });

export const deletePatient = (patientId) =>
    fetch(`api/patient/delete/` + patientId, {
        method: 'DELETE',
    }).then((res) => res.text())
        .then((text) => text.length ? JSON.parse(text) : {})
        .catch((error) => {
            throw error;
        });