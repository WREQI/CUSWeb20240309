define("DS/IssueManagement/IssueManagement_de",{});define("DS/IssueManagement/assets/nls/IssueManagement",{titles:{issues:"{number} Problem(e)",placeholder:{title:"Es sind keine anzuzeigenden Probleme vorhanden.",label:"Es wurden keine Probleme gefunden, die mit Ihrem Filter bzw. Ihren Filtern übereinstimmen.",sub:"Versuchen Sie, Ihre Filterkriterien {filter} zu ändern oder ein neues Problem {create} zu erstellen."},refreshing:"Probleme werden aktualisiert...",documentation:"Problemverwaltung – Hilfe"},error:{label:"Ein Fehler ist aufgetreten.",sub:"Es ist ein Problem mit Ihrer Anfrage aufgetreten. Aktualisieren Sie die Seite und versuchen Sie es erneut."},information:{title:"Informationen",toggleTooltip:"Informationsfenster aktivieren/deaktivieren",layoutSwitcherTooltip:"Position des Informationsfensters ändern",right:"Rechts anzeigen",bottom:"Unten anzeigen",views:{properties:"Eigenschaften",relatedObjects:"Zugehörige(s) Objekt(e)",team:"Team",attachments:"Anlagen",comments:"Kommentare",history:"Verlauf",documents:"Dokumente",noSelection:"Wählen Sie ein Problem aus, um dessen Informationen anzuzeigen"},header:{summary:"Vor {timeSince} geöffnet. Eigentümer: {owner}.",multipleSelection:{title:"{number} Probleme ausgewählt.",summary:"Änderungen werden auf alle Elemente angewendet."},goToNext:"Zum nächsten Problem gehen.",goToPrevious:"Zum vorherigen Problem gehen."}},actions:{create:{title:"Neues Problem",more:"Neu von...",placeholder:"Titel des neuen Problems...",open:"Offener Erstellungsdialog",cancel:"Abbrechen",success:"Problem erfolgreich erstellt.",failure:"Beim Erstellen ist ein Fehler aufgetreten. Versuchen Sie es erneut.",issue:{blank:"Leeres Problem erstellen",template:"Aus Vorlage erstellen",recentTemplate:"Aktuelle Vorlagen",similarIssues:"{count} ähnliche Probleme gefunden."}},templates:"Meine Vorlagen verwalten",print:"Drucken","export":"Exportieren",exportCSV:"Als CSV-Datei exportieren",exportPPTX:"Als PPTX-Datei exportieren",exportZIP:"Als ZIP-Datei exportieren",customizeView:"Ansicht anpassen",select:{title:"Objekt(e) auswählen",selectIssues:"Alle Probleme auswählen",selectChildren:"Alle zugehörigen Objekte auswählen"},find:{title:"Suchen",placeholder:"Suchen...",cancel:"Abbrechen",next:"Nächstes {number1}/{number2}",previous:"Vorheriges {number1}/{number2}",select:"{number} gefundene(s) Problem(e) auswählen"},listView:"Listenansicht",kanbanView:"Kanban-Ansicht",more:"Weitere Aktionen",dummy:"Nicht verfügbar"},kanban:{resolutionDate:{overdue:"Überfällig",none:"Kein Datum",today:"Heute",tomorrow:"Morgen",week:"Diese Woche",future:"Zukünftig"},all:"Alle",dnd:{unsupportedPromote:"Probleme können nicht direkt von {currState} zu {state} hochgestuft werden.",unsupportedDemote:"Probleme können nicht direkt von {currState} zu {state} herabgestuft werden.",cannotEditClosedIssues:"Einige Probleme sind geschlossen und konnten nicht aktualisiert werden.",placeholder:"Hier ablegen",notAllSameStatePromote:"Probleme, die nicht denselben Status aufweisen, können nicht hoch-/herabgestuft werden."},warning:{closed:"Der Filter zum Anzeigen 'geschlossener' Probleme ist nicht ausgewählt.<br>Sie können ihn in Ihren Filtereinstellungen aktivieren."},tooltips:{chizu:"Klicken, um die Spalte anzuzeigen:<br> {title}"}},filter:{title:"Aufgeführt von...",session:{header:"Meine Sitzung",title:"{number} Problem(e) anzeigen",nothing:"Keine Elemente in Sitzung"},owned:"Gehört mir",assigned:"Mir zugewiesen",others:{title:"Weitere",reported:"Gehört meiner/n Organisation(en)",responsible:"Meiner/n Organisation(en) zugewiesen",participated:"Wo ich teilnehme",closed:"Geschlossen"}},columns:{selection:"",titleColumn:"Titel",nameColumn:"Name",stateColumn:"Bearbeitungsstatus",allColumn:"Alle",validationColumn:"Validierungsstatus",descriptionColumn:"Beschreibung",priorityColumn:"Priorität",contextsColumn:"Kontexte",reportedAgainstColumn:"Bericht betrifft",resolvedByColumn:"Gelöst durch",assigneesColumn:"Inhaber",originatorColumn:"Ersteller",ownerColumn:"Eigentümer",coOwnersColumn:"Miteigentümer",participantsColumn:"Teilnehmer",modifiedColumn:"Änderungsdatum",revisionColumn:"Revision",isLastRevisionColumn:"Ist neueste Version",typeColumn:"Typ",reportingOrganizationColumn:"Berichtende Organisation",responsibleOrganizationColumn:"Verantwortliche Organisation",resolutionDateColumn:"Termin",actionTakenColumn:"Durchgeführte Aktion",resolutionRecommendationColumn:"Vorgeschlagene Korrektur",resolutionStatementColumn:"Lösungsbeschreibung",estimatedStartDateColumn:"Geschätztes Startdatum",estimatedEndDateColumn:"Geschätztes Enddatum",actualStartDateColumn:"Startdatum",actualEndDateColumn:"Beendigungsdatum",createdColumn:"Erstellungsdatum",attachmentsColumn:"Anlagen"},list:{expandOrCollapse:"Erweitern/Ausblenden",hasRelated:"Ja ({number})",noRelated:"Nein"},related:{dialogTitle:"{number} Objekt(e) von {issues} Problem(en) trennen",confirmDetach:"Möchten Sie die ausgewählten Objekte wirklich trennen?",detach:"Trennen",cancel:"Abbrechen"},commands:{properties:"Eigenschaften",whereUsed:"Verwendungsort",history:"Verlauf",compare:"Vergleichen",detach:"Trennen",attachments:"Anlagen",close:"Schließen","delete":"Löschen",duplicate:"Duplizieren",expandAll:"Zugehörige Objekte anzeigen",collapseAll:"Zugehörige Objekte ausblenden",more:"Mehr",sizeColumnToFit:"Spaltenbreite automatisch anpassen",clearSortOrder:"Sortierungseinstellung löschen",share:"Freigeben",open:{single:"Öffnen mit",multiple:"Öffnen",reportedAgainst:"Bericht betrifft",resolvedBy:"Gelöst durch",contexts:"Kontext"}},tooltips:{reportedAgainst:"{number} vom Typ 'Bericht betrifft'",resolvedBy:"{number} vom Typ 'Gelöst durch'",contexts:"{number} Kontext(e)",noReportedAgainst:"Keine Elemente vom Typ 'Bericht betrifft' angehängt",noResolvedBy:"Keine Elemente vom Typ 'Gelöst durch' angehängt",noContext:"Kein Kontext angehängt",isLastRevision:"Dies ist die neueste Revision.",isNotLastRevision:"Dies ist nicht die neueste Revision.",noIsLastRevision:"Nicht anwendbar",selectedIssues:"{number} Problem(e) ausgewählt",helper:"Klicken, um die Hilfe für das Problemmanagement anzuzeigen.",comments:"{number} Kommentar(e)",attachments:"{number} Anlagen",creationDate:"Geöffnet am {date}.",resolutionDate:"Fälligkeitsdatum: {date}",assignees:"{number} Inhaber",noAssignee:"Kein Inhaber"},notifications:{refresh:"Die Probleme wurden aktualisiert.",attachSuccess:"Objekt(e) erfolgreich angehängt.",detachSuccess:"Objekt(e) erfolgreich getrennt.",serverError:"Es ist ein Fehler aufgetreten. Aktualisieren Sie die Seite und versuchen Sie es erneut.",serverWarning:"Für diese Objekte werden gerade Servervorgänge durchgeführt. Versuchen Sie es später erneut."},preferences:{securityContext:"Anmeldeinformationen",tenant:"3DEXPERIENCE Platform",name:{title:"Widget-Titel","default":"Meine Probleme"},validation:"Fügen Sie einen Validierungsprozess für neue Probleme hinzu, um während der Problemanalyse und -prüfung eine Genehmigung/Ablehnung zu ermöglichen",highlights:{soon:"Anzahl verbleibender Tage bis zum Fälligkeitsdatum, bevor eine Warnung angezeigt wird. Spalte 'Fälligkeitsdatum' muss sichtbar sein."},tagger:"Tags ausfüllen"},validation:{none:"N/A",loading:"Informationen zum Validierungsstatus werden abgerufen...",approved:"Das Problem wurde genehmigt.",rejected:"Die Probleme wurden abgelehnt.",inProgress:"Warten auf Validierung.",notStarted:"Validierungsprozess ist aktiv."},"export":{exporting:"Problem(e) wird/werden exportiert. Bitte warten...",confirmation:{confirm:"Bestätigen",cancel:"Abbrechen"},csv:{name:"IM_Export_"},pptx:{title:"Export in PPTX-Datei bestätigen",content:"Hierdurch wird/werden {number} Problem(e) exportiert. Dies kann etwas Zeit in Anspruch nehmen. Möchten Sie fortfahren?",name:"IM_Export_",exporting:"PPTX-Datei wird exportiert...",done:"PPTX-Datei wurde exportiert",failure:"Probleme können nicht als PPTX exportiert werden"},zip:{title:"Export in ZIP-Datei bestätigen",content:"Hierdurch wird/werden {number} Problem(e) exportiert. Dies kann etwas Zeit in Anspruch nehmen. Möchten Sie fortfahren?",name:"IM_Export_",primary:"primary-image.png",exporting:"ZIP-Datei wird exportiert...",images:"Hauptbilder werden heruntergeladen...",documents:"Dokumente werden heruntergeladen...",zipping:"Dateien werden komprimiert...",done:"ZIP-Datei wurde exportiert"},exportingAll:"Alle {number} Probleme werden exportiert. Bitte warten...",nothingToExport:"Es sind keine Probleme zum Exportieren vorhanden.",failure:"Export fehlgeschlagen. Versuchen Sie es erneut.",printTotalLabel:"Probleme"},dnd:{partiallyNotSupported:"Manche Objekte werden nicht unterstützt.",notSupported:"Objekt(e) nicht unterstützt.",nothingToDrag:"Die ausgewählten Objekte verfügen über keine Elemente vom Typ 'Bericht betrifft', die verschoben werden können.",onlyIssues:"Nur Probleme können abgelegt werden.",dialogTitle:"{number} Objekt(e) {issue} beifügen",whereToDrop:"Wo möchten Sie diese Objekte anhängen?",alreadyAttached:"Dieses Objekt wurde dem Problem bereits angehängt.",attach:"Anhängen",cancel:"Abbrechen"},tasks:{cancel:"Abbrechen",cancelLabel:"Es wird eine Aufgabe ausgeführt. Sie können sie mit der Schaltfläche unten abbrechen."},facets:{attachments:{placeholder:"Diese Ansicht unterstützt keine Mehrfachauswahl. Wählen Sie nur ein Problem aus, um dessen Anlagen anzuzeigen."},comments:{placeholder:"Diese Ansicht unterstützt keine Mehrfachauswahl. Wählen Sie nur ein Problem aus, um dessen Kommentare anzuzeigen."},history:{placeholder:"Diese Ansicht unterstützt keine Mehrfachauswahl. Wählen Sie nur ein Problem aus, um dessen Verlauf anzuzeigen."}},tagger:{waiting:{title:"6WTags werden angewendet...",label:"Ihre Probleme werden auf Grundlage vorheriger 6WTags gefiltert."},cancel:"Abbrechen"}});