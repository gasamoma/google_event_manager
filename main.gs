function myFunction() {
    var spreadsheet = SpreadsheetApp.getActiveSheet();
    var calendarId = "yourEmail@google.com";
    var eventCal = CalendarApp.getCalendarById(calendarId);
    var lr = spreadsheet.getLastRow();
    var rawData = spreadsheet.getRange("A3:AW"+lr+"").getValues();
    var column_width = 4;
    var now = new Date();
    for (x=0; x<rawData.length; x++) {
        var simpleRow = rawData[x];
        var subject = simpleRow[0];
        var y = 1;
        var Agua = [simpleRow[y+0], simpleRow[y+1], simpleRow[y+2], simpleRow[y+3]];
        var ev_id = createEvents('Agua', subject, Agua, x, spreadsheet);
        store_ids(x, y, ev_id, spreadsheet);
        y += column_width;
        var Aseo = [simpleRow[y+0], simpleRow[y+1], simpleRow[y+2], simpleRow[y+3]];
        ev_id = createEvents('Aseo', subject, Aseo, x);
        store_ids(x, y, ev_id, spreadsheet);
        y += column_width;
        var Luz = [simpleRow[y+0], simpleRow[y+1], simpleRow[y+2], simpleRow[y+3]];
        ev_id = createEvents('Luz', subject, Luz, x);
        store_ids(x, y, ev_id, spreadsheet);
        y += column_width;
        var TelefoniaCelular = [simpleRow[y+0], simpleRow[y+1], simpleRow[y+2], simpleRow[y+3]];
        ev_id = createEvents('TelefoniaCelular', subject, TelefoniaCelular, x);
        store_ids(x, y, ev_id, spreadsheet);
        y += column_width;
        var Intenet = [simpleRow[y+0], simpleRow[y+1], simpleRow[y+2], simpleRow[y+3]];
        ev_id = createEvents('Intenet', subject, Intenet, x);
        store_ids(x, y, ev_id, spreadsheet);
        y += column_width;
        var Television = [simpleRow[y+0], simpleRow[y+1], simpleRow[y+2], simpleRow[y+3]];
        ev_id = createEvents('Television', subject, Television, x);
        store_ids(x, y, ev_id, spreadsheet);
        y += column_width;
        var Gas = [simpleRow[y+0], simpleRow[y+1], simpleRow[y+2], simpleRow[y+3]];
        ev_id = createEvents('Gas', subject, Gas, x);
        store_ids(x, y, ev_id, spreadsheet);
        y += column_width;
        var Admin = [simpleRow[y+0], simpleRow[y+1], simpleRow[y+2], simpleRow[y+3]];
        ev_id = createEvents('Admin', subject, Admin, x);
        store_ids(x, y, ev_id, spreadsheet);
        y += column_width;
        var Seguro = [simpleRow[y+0], simpleRow[y+1], simpleRow[y+2], simpleRow[y+3]];
        ev_id = createEvents('Seguro', subject, Seguro, x);
        store_ids(x, y, ev_id, spreadsheet);
        y += column_width;
        var PaseYa = [simpleRow[y+0], simpleRow[y+1], simpleRow[y+2], simpleRow[y+3]];
        ev_id = createEvents('PaseYa', subject, PaseYa, x);
        store_ids(x, y, ev_id, spreadsheet);
        y += column_width;
        var Prestamos = [simpleRow[y+0], simpleRow[y+1], simpleRow[y+2], simpleRow[y+3]];
        ev_id = createEvents('Prestamos', subject, Prestamos, x);
        store_ids(x, y, ev_id, spreadsheet);
        y += column_width;
        var Parafiscales = [simpleRow[y+0], simpleRow[y+1], simpleRow[y+2], simpleRow[y+3]];
        ev_id = createEvents('Parafiscales', subject, Parafiscales, x);
        store_ids(x, y, ev_id, spreadsheet);
        y += column_width;
    }
}
function createEvents(invoice, subject, subject_item){
  if(subject_item[0]==""){
    return ""
  }
  var now = new Date();
  var until = new Date(now.getFullYear()+1,11,31,23,59,59);
  var recurrence = CalendarApp.newRecurrence().addMonthlyRule().until(until);
  var start_time = new Date(now.getFullYear(),now.getMonth(),subject_item[0],00,00,00);
  var end_time = new Date(now.getFullYear(),now.getMonth(),subject_item[1],23,59,59);
  if(subject_item[3]!=""){
    var eventSeries = CalendarApp.getDefaultCalendar().getEventSeriesById(subject_item[3]);
    eventSeries = eventSeries.setTitle('Pagar ' +invoice+' '+subject);
    eventSeries = eventSeries.setRecurrence(recurrence, start_time, end_time);
    eventSeries = eventSeries.setDescription(subject_item[2]);
  }else{
    var eventSeries = CalendarApp.getDefaultCalendar().createEventSeries(
      'Pagar ' +invoice+' '+subject,
      start_time,
      end_time,
      recurrence,
      {description: subject_item[2]});
  }
  return eventSeries.getId()

}
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Sync to Calendar')
      .addItem('Create Events Now', 'myFunction')
      .addToUi();
}
function store_ids(x,y,ev_id,spreadsheet){
  if(ev_id == ""){
    return
  }
  var offset = 3;
  var cell = spreadsheet.getRange(x+offset, y+4);
  cell.setValue(ev_id);
}