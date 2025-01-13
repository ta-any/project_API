// Condition

//s.RowData – это объект, который
// вы передали в запросе на создание задачи
// на звонок в поле data.data.

s.RowData.length != 0 // return true out call
s.RowData.length === 0  // return true in call

// Next BlackBox branch outgoing call

v.doctorFullName = s.RowData[0]
// обрезать имя?
v.patientFullName = s.RowData[1].trim().split(' ').slice(0, -1).join(' ');
v.appointmentDate = s.RowData[2]
v.appointmentTime = s.RowData[3]


// {s.RowData[2]} === $doctorFullName

//  РМ
// Здравствуйте! Звоним Вам, $patientFullName, чтобы напомнить о вашей записи на приём
// на $appointmentDate в $appointmentTime
// специалист $doctorFullName будет ожидать Вас!

// если сценарий дошел до этого блока то считается, что клиент прослушал сообщение
// значит можно менять статус звонка, как успешно завершенный



