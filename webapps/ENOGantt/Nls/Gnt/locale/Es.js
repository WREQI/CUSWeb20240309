Ext.define("Gnt.locale.Es",{extend:"Sch.locale.Locale",requires:"Sch.locale.Es",singleton:true,l10n:{"Gnt.util.DurationParser":{unitsRegex:{MILLI:/^ms$|^milisegundo/i,SECOND:/^s$|^segundo/i,MINUTE:/^min$|^minuto/i,HOUR:/^h$|^hora$|^hora/i,DAY:/^d$|^día/i,WEEK:/^sem.$|^sem.|^semana/i,MONTH:/^m|^mes/i,QUARTER:/^t$|^trim.|^trimestre/i,YEAR:/^a$|^año|^año/i}},"Gnt.util.DependencyParser":{typeText:{SS:"SS",SF:"SF",FS:"FC",FF:"FF"}},"Gnt.field.Duration":{invalidText:"El valor de duración no es válido."},"Gnt.feature.DependencyDragDrop":{fromText:"De",toText:"A",startText:"Inicio",endText:"Fin"},"Gnt.Tooltip":{startText:"Comienza: ",endText:"Finaliza: ",durationText:"Duración: "},"Gnt.plugin.TaskContextMenu":{taskInformation:"Información de la tarea...",newTaskText:"Nueva tarea",deleteTask:"Eliminar tareas",editLeftLabel:"Editar etiqueta izquierda",editRightLabel:"Editar etiqueta derecha",add:"Agregar...",deleteDependency:"Eliminar dependencia...",addTaskAbove:"Tarea arriba",addTaskBelow:"Tarea abajo",addMilestone:"Etapa",addSubtask:"Subtarea",addSuccessor:"Sucesor",addPredecessor:"Predecesor",convertToMilestone:"Convertir en etapa",convertToRegular:"Convertir en tarea regular"},"Gnt.plugin.DependencyEditor":{fromText:"De",toText:"A",typeText:"Tipo",lagText:"Posposición",endToStartText:"Fin a comienzo",startToStartText:"Comienzo a comienzo",endToEndText:"Fin a fin",startToEndText:"Comienzo a fin"},"Gnt.widget.calendar.Calendar":{dayOverrideNameHeaderText:"Nombre",overrideName:"Nombre",startDate:"Fecha de inicio",endDate:"Fecha de fin",error:"Error",dateText:"Fecha",addText:"Agregar",editText:"Editar",removeText:"Quitar",workingDayText:"Día laborable",weekendsText:"Fines de semana",overriddenDayText:"Día anulado",overriddenWeekText:"Semana anulada",workingTimeText:"Período laborable",nonworkingTimeText:"Período no laborable",dayOverridesText:"Anulaciones de días",weekOverridesText:"Anulaciones de semanas",okText:"Aceptar",cancelText:"Cancelar",parentCalendarText:"Calendario padre",noParentText:"Sin padre",selectParentText:"Seleccionar padre",newDayName:"[Sin nombre]",calendarNameText:"Nombre del calendario",tplTexts:{tplWorkingHours:"Horas laborables para",tplIsNonWorking:"es no laborable",tplOverride:"anulación",tplInCalendar:"en el calendario",tplDayInCalendar:"día estándar en el calendario",tplBasedOn:"Se basa en"},overrideErrorText:"Ya existe una anulación para este día.",overrideDateError:"Ya existe una anulación de semana en esta fecha: {0}",startAfterEndError:"La fecha de inicio debe ser anterior a la fecha de fin.",weeksIntersectError:"Las anulaciones de semana no deben interferir."},"Gnt.widget.calendar.AvailabilityGrid":{startText:"Inicio",endText:"Fin",addText:"Agregar",removeText:"Quitar",error:"Error"},"Gnt.widget.calendar.DayEditor":{workingTimeText:"Período laborable",nonworkingTimeText:"Período no laborable"},"Gnt.widget.calendar.WeekEditor":{defaultTimeText:"Tiempo predeterminado",workingTimeText:"Período laborable",nonworkingTimeText:"Período no laborable",error:"Error",noOverrideError:"La anulación de semana no se puede guardar porque solo contiene días 'predeterminados'."},"Gnt.widget.calendar.ResourceCalendarGrid":{name:"Nombre",calendar:"Calendario"},"Gnt.widget.calendar.CalendarWindow":{ok:"Aceptar",cancel:"Cancelar"},"Gnt.field.Assignment":{cancelText:"Cancelar",closeText:"Guardar y cerrar"},"Gnt.column.AssignmentUnits":{text:"Unidades"},"Gnt.column.Duration":{text:"Duración"},"Gnt.column.Effort":{text:"Esfuerzo"},"Gnt.column.EndDate":{text:"Finalización"},"Gnt.column.PercentDone":{text:"% listo"},"Gnt.column.ResourceAssignment":{text:"Recursos asignados"},"Gnt.column.ResourceName":{text:"Nombre del recurso"},"Gnt.column.Rollup":{text:"Tarea de acumulación",no:"No",yes:"Sí"},"Gnt.column.SchedulingMode":{text:"Modo"},"Gnt.column.Predecessor":{text:"Predecesores"},"Gnt.column.Successor":{text:"Sucesores"},"Gnt.column.StartDate":{text:"Inicio"},"Gnt.column.WBS":{text:"EDT"},"Gnt.column.Sequence":{text:"N.º"},"Gnt.column.Calendar":{text:"Calendario"},"Gnt.widget.taskeditor.TaskForm":{taskNameText:"Nombre",durationText:"Duración",datesText:"Fechas",baselineText:"Línea de base",startText:"Inicio",finishText:"Finalización",percentDoneText:"Porcentaje completo",baselineStartText:"Inicio",baselineFinishText:"Finalización",baselinePercentDoneText:"Porcentaje completo",effortText:"Esfuerzo",invalidEffortText:"El valor de esfuerzo no es válido.",calendarText:"Calendario",schedulingModeText:"Modo de planificación",rollupText:"Total acumulado"},"Gnt.widget.DependencyGrid":{idText:"Id.",snText:"SN",taskText:"Nombre de la tarea",blankTaskText:"Seleccione una tarea.",invalidDependencyText:"Dependencia no válida",parentChildDependencyText:"Se encontró una dependencia entre el hijo y el padre.",duplicatingDependencyText:"Se encontró una dependencia duplicada.",transitiveDependencyText:"Dependencia transitiva",cyclicDependencyText:"Dependencia cíclica",typeText:"Tipo",lagText:"Posposición",clsText:"Clase de CSS",endToStartText:"Fin a comienzo",startToStartText:"Comienzo a comienzo",endToEndText:"Fin a fin",startToEndText:"Comienzo a fin"},"Gnt.widget.AssignmentEditGrid":{confirmAddResourceTitle:"Confirmar",confirmAddResourceText:"El recurso &quot;{0}&quot; no se encontró en la lista. ¿Desea agregarlo?",noValueText:"Seleccione un recurso para asignar.",noResourceText:"No se encontró ningún recurso &quot;{0}&quot; en la lista."},"Gnt.widget.taskeditor.TaskEditor":{generalText:"General",resourcesText:"Recursos",dependencyText:"Predecesores",addDependencyText:"Agregar nuevo",dropDependencyText:"Quitar",notesText:"Notas",advancedText:"Avanzado",wbsCodeText:"Código de EDT",addAssignmentText:"Agregar nuevo",dropAssignmentText:"Quitar"},"Gnt.plugin.TaskEditor":{title:"Información de la tarea",alertCaption:"Información",alertText:"Corrija los errores marcados para guardar los cambios.",okText:"Aceptar",cancelText:"Cancelar"},"Gnt.field.EndDate":{endBeforeStartText:"La fecha de fin es anterior a la fecha de inicio."},"Gnt.column.Note":{text:"Nota"},"Gnt.column.AddNew":{text:"Agregar nueva columna..."},"Gnt.column.EarlyStartDate":{text:"Inicio temprano"},"Gnt.column.EarlyEndDate":{text:"Finalización temprana"},"Gnt.column.LateStartDate":{text:"Inicio retrasado"},"Gnt.column.LateEndDate":{text:"Finalización retrasada"},"Gnt.field.Calendar":{calendarNotApplicable:"El calendario de la tarea no se superpone con los calendarios de los recursos asignados."},"Gnt.column.Slack":{text:"Demora"},"Gnt.column.Name":{text:"Nombre de la tarea"},"Gnt.column.BaselineStartDate":{text:"Fecha de inicio de la línea de base"},"Gnt.column.BaselineEndDate":{text:"Fecha de fin de la línea de base"},"Gnt.column.Milestone":{text:"Etapa"},"Gnt.field.Milestone":{yes:"Sí",no:"No"},"Gnt.field.Dependency":{invalidFormatText:"Formato de dependencia no válido",invalidDependencyText:"Se encontró una dependencia no válida. Asegúrese de que no existan rutas de acceso cíclicas entre sus tareas.",invalidDependencyType:"Tipo de dependencia no válido {0}. Los valores permitidos son: {1}."},"Gnt.column.Type":{text:"Tipo"},"Gnt.column.Id":{text:"Id."},"Gnt.column.Dependency":{text:"Dependencia"},"Gnt.column.State":{text:"Estado"},"Gnt.column.PercentComplete":{text:"%"},"Gnt.column.Estimated Duration":{text:"Duración estimada"},"Gnt.column.Estimated Start Date":{text:"Fecha estimada de inicio"},"Gnt.column.Estimated Finish Date":{text:"Fecha estimada de finalización"},"Gnt.column.Actual Duration":{text:"Duración real"},"Gnt.column.Actual Start Date":{text:"Fecha real de inicio"},"Gnt.column.Actual Finish Date":{text:"Fecha real de finalización"},"Gnt.column.Baseline Initial Start Date":{text:"Fecha de inicio de la línea de base inicial"},"Gnt.column.Baseline Initial Finish Date":{text:"Fecha de finalización de la línea de base inicial"},"Gnt.column.Baseline Current Start Date":{text:"Fecha de inicio de la línea de base actual"},"Gnt.column.Baseline Current Finish Date":{text:"Fecha de finalización de la línea de base actual"},"Gnt.column.Deviation":{text:"Desviación"},"Gnt.column.Assignee":{text:"Persona asignada"}}});