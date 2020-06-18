define("DS/IssueComponents/IssueComponents_fr",{});define("DS/IssueComponents/assets/nls/IssueComponents",{maturity:{create:"Nouveau",assign:"En attente",active:"Actif",review:"En cours de révision",closed:"Fermé"},priorities:{title:"Priorité",low:"Faible",medium:"Moyen",high:"Elevé",urgent:"Urgent"},dates:{seconds:"{number} seconde(s)",minutes:"{number} minute(s)",hours:"{number} heure(s)",days:"{number} jour(s)",months:"{number} mois",years:"{number} année(s)"},placeholder:{reportedAgainstPlaceholder:"Recherchez, sélectionnez dans 3D ou déposez un objet à définir à l'état Signalé contre.",resolvedByPlaceholder:"Recherchez, sélectionnez dans 3D ou déposez un objet à définir à l'état Résolu par.",contextPlaceholder:"Recherchez ou déposez un objet à définir comme Contextes."},lifecycle:{create:"Définissez le ou les problèmes à l'état NOUVEAU pour indiquer que vous commencez à les traiter.",assign:"Définissez le ou les problèmes à l'état EN ATTENTE pour autoriser les personnes affectées à les traiter.",active:"Définissez le ou les problèmes à l'état ACTIF pour indiquer que vous les traitez.",review:"Définissez le ou les problèmes à l'état EN COURS DE REVISION pour autoriser la révision de votre correction.",closed:"Fermez le problème s'il a été complètement résolu.",partial:"L'opération a échoué pour {number} problème(s).",error:"Une erreur s'est produite, veuillez actualiser votre page et réessayer.",notSupported:"Seuls les problèmes ayant un état de maturité et un processus de validation identiques peuvent être promus ou rétrogradés.",routeIndicatorTooltip:{rejectionTitle:"Rejeté par :",approvalTitle:"Approuvé par :",rejectionText:"{name} le {date}.",approvalText:"{name} le {date}.",moreTooltip:{title:"{number} décision(s)",approvalText:"Approuvé le {date}",rejectionText:"Rejeté le {date}"},inProgressTooltip:{title:"En attente d'approbation de :",multiSelectionTitle:"Les problèmes sélectionnés sont en attente d'approbation de plusieurs vérificateurs."}},approveModal:{reasonLabel:"Commentaire :",reasonPlaceholder:"Indiquer un commentaire...",header:"Approuvez la promotion vers l'état {approveTo}.",reasonRequired:"Entrez un commentaire.",actionLabel:"Action :",actionPlaceholder:"Indiquer l'action à effectuer...",okButton:"Approuver",cancelButton:"Annuler"},rejectModal:{reasonLabel:"Raison :",reasonPlaceholder:"Indiquer une raison...",header:"Rejetez la promotion vers l'état {approveTo} et rétrogradez vers {rejectTo}.",reasonRequired:"Indiquez une raison.",actionLabel:"Action :",actionPlaceholder:"Indiquer l'action à effectuer...",okButton:"Rejeter",cancelButton:"Annuler"},paths:{anyStateToClose:"Permet la fermeture à partir de n'importe quel état par le propriétaire du problème.",approve:"Approuver",reject:"Rejeter"},orgs:{Reporting:"Organisation de rapport",Responsible:"Organisation responsable"}},routes:{header:{states:"Promotion de la maturité",routes:"Décisions"},columns:{reviewer:"Vérificateur",date:"Date de décision",reason:"Raison/commentaire",action:"Action",attachments:"Pièces jointes"},attachmentsManagerTitle:"Décision de promotion de la maturité [{fromState} -> {toState}] [{status}]",status:{approved:"Approuvé",rejected:"Rejeté",inProgress:"En cours"},confirm:"Confirmer",approve:"Approuver"},create:{title:"problème(s)",titleTemplate:"modèle(s)",titleActionCreate:"Nouveau",titleActionEdit:"Editer",templateApplySuccess:"Le modèle {name} a été correctement appliqué.",templateApplyError:"Une erreur s'est produite lors de l'application du modèle '{name}'.",templateApplyWarningAttachments:"Certaines pièces jointes référencées par le modèle n'existent plus. Elles n'ont pas pu être ajoutées.",issueApplySuccess:"Le problème {title} - {name} a été correctement appliqué.",issueApplyError:"Une erreur s'est produite lors de l'application du problème '{title} - {name}'.",required:"Un champ obligatoire ne peut être vide.",creationSuccess:"Problème correctement créé.",creationTemplateSuccess:"Modèle correctement créé.",updateTemplateSuccess:"Modèle correctement mis à jour.",creationFailed:"Une erreur s'est produite lors de la création, veuillez réessayer.",validationFailed:"Certains champs n'ont pas été complétés correctement.",promotionSuccess:"Problème correctement promu.",promotionFailed:"Une erreur s'est produite au cours de la promotion.",uploadImagesFailed:"Une erreur s'est produite lors du téléchargement des images.",sendButton:"Envoyer",saveButton:"Enregistrer",saveAsDraftButton:"Enregistrer comme brouillon",cancelButton:"Annuler",modeToggler:{multiStep:"Plusieurs étapes",fullView:"Vue complète",tooltipMultiStep:"Passer à la vue à plusieurs étapes",tooltipFullView:"Passer à la vue complète"},start:{title:"Créer des problèmes et des modèles",cancelButton:"Annuler",actionPage:{issue:{title:"Problème",fromBlank:"Nouveau",fromIssue:"Dupliquer un problème",fromTemplate:"A partir d'un modèle"},template:{title:"Modèle",fromBlank:"Nouveau",fromIssue:"A partir d'un problème existant",edit:"Gérer",cloneSuffix:"[DUP]"}}},views:{properties:"Propriétés",relatedObjects:"Objet(s) lié(s)",team:"Equipe",attachments:"Pièces jointes",moreAttributes:"Plus d'attributs",finalize:"Finaliser"},properties:{labels:{title:"Description courte",titlePlaceholder:"Description courte du nouveau problème...",titleHelper:"Résumé du problème en une ligne.",similarIssues:"Problèmes similaires",similarIssuesHelper:"Ces problèmes existants ont un titre semblable. Il serait peut-être préférable de faire des commentaires à ce sujet plutôt que de créer un autre problème similaire.",description:"Description",descriptionPlaceholder:"Rédiger une description...",descriptionHelper:"Description détaillée du problème. Un ensemble d'éléments en texte riche prêt à l'emploi est disponible.",resolutionRecommendation:"Correction proposée",resolutionRecommendationPlaceholder:"Comment faire ?",resolutionRecommendationHelper:"Recommandation pour expliquer comment le problème devrait être résolu.",priorityHelper:"Importance du problème par rapport à d'autres problèmes.",priorityHelperUrgent:"Urgent : priorité la plus élevée. Indique que ce problème est prioritaire sur tous les autres.",priorityHelperHigh:"Elevé : indique que ce problème entraîne des désagréments et nécessite une attention urgente.",priorityHelperMedium:"Moyen : indique que ce problème a un impact considérable.",priorityHelperLow:"Faible : indique que ce problème a un impact minime.",dueDate:"Echéance",dueDatePlaceholder:"Sélectionner une échéance...",dueDateHelper:"Date à laquelle ce problème doit être résolu.",resolutionStatement:"Déclaration de résolution",resolutionStatementPlaceholder:"Comment le ou les problèmes ont-ils été résolus ?"}},related:{labels:{reportedAgainst:"Signalé contre",reportedAgainstHelper:'Cette relation est utilisée pour associer des objets à un problème, afin de les identifier comme "défectueux" (par exemple objet 3D, document, etc.)',reportedAgainstPlaceholder:"Recherchez, sélectionnez dans 3D ou déposez un objet à définir à l'état Signalé contre.",contexts:"Contextes",contextHelper:"Egalement appelé Contexte DMU, il est utilisé pour attacher un objet au problème, afin de mieux comprendre celui-ci. Il peut s'agir d'un autre objet 3D avec une structure plus grande, afin de voir le contexte entier d'un problème.",contextPlaceholder:"Recherchez ou déposez un objet à définir comme Contexte."},search:"Recherchez et ajoutez un objet.",remove:"Enlever le ou les objets sélectionnés.",removeErrorNoSelection:"Veuillez sélectionner des objets à enlever.",addBalloonAvailable:"Choisissez un élément spécifique dans la 3D pour l'ajouter au problème.",addBalloonNotAvailable:"La sélection dans la 3D est uniquement disponible pour Issue 3D Review.",alreadyReportedAgainst:"Cet objet a déjà été ajouté, veuillez en sélectionner un autre.",dropError:"Les objets déposés ne sont pas pris en charge.",selectContextIn3D:"Choisissez un élément spécifique dans la 3D afin de sélectionner un contexte pour le problème.",contextMultiError:"L'ajout de plusieurs objets dans le contexte n'est pas pris en charge.",treelist:{tree:"Description courte","ds6w:type":"Type","ds6w:identifier":"Nom","ds6wg:revision":"Révision"}},team:{labels:{owner:"Propriétaire",coOwners:"Copropriétaires",ownerHelper:"Cette relation vous permet de définir la personne qui est propriétaire du problème, en leur donnant tous les droits d'accès.",coOwnersHelper:"Cette relation permet d'ajouter un copropriétaire au problème et de lui donner des droits d'accès équivalents à ceux du propriétaire principal.",assignees:"Personnes affectées",assigneesHelper:"Cette relation permet d'affecter une ou plusieurs personnes au problème. La personne affectée verra ce problème dans sa liste et pourra commencer à le traiter.",reviewers:"Réviseurs",participants:"Participants",assignToMe:"Affecter à moi",responsibleOrganization:"Organisation responsable",responsibleOrganizationHelper:"Définissez l'organisation responsable de ce problème (automatiquement complété une fois l'état Signalé contre ajouté)."},alreadyAssigned:"{name} a déjà été affecté(e).",removeAssignee:"Cliquez pour enlever cet utilisateur.",cannotAddOwnerAsCoOwner:"Vous ne pouvez pas ajouter le propriétaire comme copropriétaire."},attachments:{labels:{attachmentsHelper:"Les pièces jointes peuvent fournir plus de détails sur le contenu du problème. Il peut s'agir de fichiers de toutes sortes, d'objets 3DEXPERIENCE existants ou de captures d'écran annotées de l'app Issue 3D Review.",attachmentsPlaceholder:"Téléchargez/déposez un fichier, cherchez/déposez un objet 3DEXPERIENCE ou utilisez le bouton de capture d'écran annotée pour créer et ajouter une nouvelle pièce jointe.",attachmentsPlaceholderNotAvailable:"Téléchargez/déposez un fichier ou cherchez/déposez un objet 3DEXPERIENCE pour créer et ajouter une nouvelle pièce jointe.",attachments:"Pièces jointes"},screenshotAvailable:"Effectuez une capture d'écran.",screenshotNotAvailable:"La fonction de capture d'écran est uniquement disponible depuis Issue 3D Review.",remove:"Enlevez le ou les documents sélectionnés.",removeErrorNoSelection:"Veuillez sélectionner des documents à enlever.",attach:{fromLocalDisk:"Téléchargez les fichiers.",from3DX:"Recherchez des objets 3DEXPERIENCE."},uploadDialog:{title:"Téléchargement de {number} fichier(s)...",uploadCompleted:"{success}/{total} fichier(s) ont été téléchargés avec succès."}},finalize:{labels:{lifecycle:"Cycle de vie",approval:"Approbation",template:"Modèle",saveAsTemplate:"Enregistrer en tant que modèle",templateNamePlaceholder:"Nom du modèle (champ obligatoire)...",templateDescriptionPlaceholder:"Description du modèle...",templateOverwrite:"Un modèle existant avec le même nom sera écrasé."},closeDialogToggle:"Fermez la boîte de dialogue après la création.",promoteToAssignToggle:"Promouvez le problème directement à l'état 'En attente'.",enableApproval:"Activez l'approbation pour garantir la validation et la révision de ce problème.",saveAsTemplateToggle:"Enregistrez le formulaire en tant que modèle réutilisable."}},templates:{title:"Sélectionner un modèle",titleEdit:"Gérer les modèles",cancelButton:"Annuler",closeButton:"Fermer",selectButton:"Sélectionner",treeList:{shared:"Partagé",tree:"Nom",description:"Description",owner:"Propriétaire",isNotShared:"Ce modèle est privé",isShared:"Ce modèle est partagé",placeholder:"Aucun modèle disponible."},iconBar:{title:"Modèles",create:"Nouveau",fromIssue:"Nouveau à partir d'un problème",clone:"Dupliquer",edit:"Editer","delete":"Supprimer",share:"Partager"},lastUsed:{title:"Récemment utilisé"},preview:{objectCount:"objets",noObject:"Aucun objet"},shared:{title:"Modèle de problème partagé - {owner}",description:"Ce document contient un modèle de problème partagé.",file:"Modèle de problème partagé - {owner}",popover:{title:"Lien vers ce modèle partagé",copy:"Copier un lien"}},confirmDelete:{title:"Suppression de {number} modèle(s)",text:"Etes-vous sûr de vouloir supprimer les modèles sélectionnés ? Cette opération de suppression est <b>définitive</b> et irréversible.",sharedInfo:"Les modèles partagés dont vous n'êtes pas propriétaire seront supprimés <b>uniquement de votre liste</b>.",sharedWarning:"Les modèles partagés dont vous êtes propriétaire seront supprimés <b>de tous les utilisateurs</b>.",okButton:"Supprimer",cancelButton:"Annuler"},clonePrefix:"Doublon de {name}",errors:{get:"Une erreur s'est produite lors de l'extraction des modèles, veuillez actualiser la page et réessayer.",remove:"Un erreur s'est produite lors de la suppression des modèles, veuillez actualiser la page et réessayer.",save:"Une erreur s'est produite lors de l'enregistrement des modèles, veuillez actualiser la page et réessayer."},notifications:{sharedSuccess:"Ce modèle a été partagé, et une URL partageable a été générée.",sharedTemplateAdded:"Un modèle partagé a été ajouté à votre liste de modèles.",sharedTemplateNotValid:"Ce modèle partagé n'est plus valide. Il n'a pas été ajouté à votre liste de modèles.",sharedTemplateAlreadyAdded:"Ce modèle partagé figure déjà dans votre liste de modèles.",sharedTemplateNotAdded:"Une erreur s'est produite lors de l'ajout du modèle partagé, actualisez la page et réessayez.",sharedTemplateURL:"L'URL de modèle partagé a été copiée dans votre presse-papiers."}},open:{dialog:{title:"Ouvrir les objets dans...",open:"Ouvrir",cancel:"Annuler"},labels:{placeholder:"Sélectionner votre application",contexts:"Contextes",reportedAgainst:"Signalé contre",resolvedBy:"Résolu par",nothing:"Il n'y a rien à ouvrir, veuillez sélectionner un autre objet."},error:"Une erreur s'est produite lors de l'ouverture des objets sélectionnés, veuillez actualiser et réessayer."},close:{preparing:"Préparation de la fermeture...",title:"Fermeture de {number} problème(s)",nothing:"Aucun problème à fermer.",close:"Fermer",cancel:"Annuler",warning:"Voulez-vous vraiment fermer ces problèmes ?",closable:"La fermeture du ou des problèmes suivants empêchera toute modification, à moins qu'ils ne soient ouverts à nouveau :",indelible:"Le ou les problèmes sont déjà fermés :",singleSuccess:"{title} a été fermé.",multipleSuccess:"{number} problèmes ont été fermés.",error:"Une erreur s'est produite lors de la fermeture, veuillez réessayer."},"delete":{preparing:"Préparation de la suppression...",title:"Suppression de {number} problème(s)",nothing:"Aucun problème à supprimer.","delete":"Supprimer",cancel:"Annuler",warning:"Voulez-vous vraiment supprimer ce contenu ?",deletable:"La suppression du ou des problèmes suivants est <b>permanente</b> et irréversible :",indelible:'Le ou les problèmes suivants ne peuvent pas être supprimés, car ils n\'ont pas le statut "Nouveau" :',singleSuccess:"{title} a été supprimé.",multipleSuccess:"{number} problèmes ont été supprimés.",error:"Une erreur s'est produite lors de la suppression, veuillez réessayer."},duplicate:{title:"Dupliquer {number} problème(s).",preparing:"Préparation de la duplication...",duplicate:"Dupliquer",cancel:"Annuler",content:"Le ou les problèmes suivants seront dupliqués (<i>le ou les problèmes dupliqués vous appartiendront à l'état Nouveau</i>) :",singleSuccess:"{title} a été dupliqué.",multipleSuccess:"{number} problèmes ont été dupliqués.",multipleCopiesSuccess:"{number1} problème(s) a/ont été dupliqués {number2} fois.",error:"Une erreur s'est produite lors de la duplication, veuillez réessayer.",keepAttachments:"Conserver les pièces jointes existantes dans les problèmes dupliqués",advancedOptions:"Duplication avancée",titleModifier:"Modificateurs de titre",copyCount:"Nombre de copies",replace:"Remplacer",replacePlaceholder:"Remplacer la chaîne dans le titre",suffix:"Suffixe",suffixPlaceholder:"Suffixe pour le titre",prefix:"Préfixe",prefixPlaceholder:"Préfixé pour le titre",iterator:"Itérateur",iteratorPlaceholder:"Modèle itérateur",replaceHelp:"Indique la partie du titre à remplacer par une chaîne ou une expression régulière suivie de la chaîne par laquelle la remplacer. Chaque partie sera séparée par :. par exemple [a-z]*:Test remplacera toutes les chaînes en minuscules dans le titre par Test",suffixHelp:"Indique la chaîne avec laquelle suffixer le titre des problèmes dupliqués",prefixHelp:"Indique la chaîne avec laquelle préfixer le titre des problèmes dupliqués",iteratorHelp:"Indique la partie du titre à incrémenter en tant que chaîne ou expression régulière après duplication. La partie numérique sera incrémentée",confirmTitle:"Confirmer la duplication de {number} problème(s).",confirm:"Confirmer",confirmMsg:"Le problème {title} sera dupliqué en tant que"},images:{title:"{count} image(s)",actions:{download:"Télécharger",upload:"Charger","delete":"Supprimer",popup:"Message instantané",annotate:"Revue"},noImages:"Aucune image à afficher.",popup:{title:"Affichage de l'image",holdIssue:"Mettre en attente le problème",releaseIssue:"Publier le problème"},"delete":{cancel:"Annuler",confirmDeleteTitle:"Supprimer l'image",confirmDeleteMessage:"Voulez-vous vraiment supprimer cette image de manière définitive ?",imageDisplayDeleteError:"Erreur lors de la suppression d'images",okButton:"OK",pictureDeleted:"Un ou plusieurs fichiers image ont été supprimés."},notSupported:"Ce format de fichier n'est pas pris en charge. <br>Fichier : {name}.",errorUpload:"Impossible de télécharger l'image {name}.",pictureUploaded:"Un ou plusieurs fichiers image ont été téléchargés."},team:{title:"{count} membre(s)",error:{loadContent:"Impossible de récupérer les informations sur le problème.",alreadyAdded:"L'utilisateur {name} a déjà été ajouté au rôle {role} pour le ou les problèmes sélectionnés.",isOwner:"L'utilisateur {name} est propriétaire du ou des problème(s) sélectionné(s) et ne peut donc pas être ajouté comme copropriétaire.",update:"Echec de la mise à jour du rôle {role} des problèmes",notSupportedDrop:"Les objets déposés ne sont pas pris en charge.",notFound:"Aucun résultat trouvé."},success:{update:"Le rôle {role} des problèmes a été mis à jour."},filter:{title:"Filtrer",placeholder:"Filtrer les membres de l'équipe"},owner:{title:"Propriétaire",changeOwnership:"Changer la propriété"},confirmRemoveTitle:"Enlever {user} de {role}",confirmRemoveText:"Voulez-vous vraiment enlever {user} du rôle {role} ?",removeOkButton:"Enlever",removeCancelButton:"Annuler",coOwners:{title:"Copropriétaires",add:"Ajouter un copropriétaire",propagate:"Propager ce copropriétaire à tous les problèmes sélectionnés",propagateAll:"Propager tous les copropriétaires à tous les problèmes sélectionnés",remove:"Supprimer le copropriétaire du ou des problèmes sélectionnés",search:{placeholder:"Rechercher un utilisateur à ajouter en tant que copropriétaire..."},addSelf:"Affecter à moi"},assignees:{title:"Personnes affectées",add:"Ajouter une personne affectée",propagate:"Propager cette personne affectée à tous les problèmes sélectionnés",propagateAll:"Propager toutes les personnes affectées à tous les problèmes sélectionnés",remove:"Supprimer la personne affectée du ou des problèmes sélectionnés",search:{placeholder:"Rechercher un utilisateur à ajouter en tant que personne affectée..."},addSelf:"Affecter à moi-même"},participants:{title:"Participants",add:"Ajouter un participant",propagate:"Propager ce participant à tous les problèmes sélectionnés",propagateAll:"Propager tous les participants à tous les problèmes sélectionnés",remove:"Supprimer le participant du ou des problèmes sélectionnés",search:{placeholder:"Rechercher un utilisateur à ajouter en tant que participant..."}},common:{tooltip:"Ce membre est affecté à tous les problèmes sélectionnés.",label:"Est affecté",notLabel:"Varie"},notSaved:{tooltip:"Ce membre n'est pas encore enregistré."},changeLayout:"Modifier la disposition de la vue"},search:{error:{usersNotFound:"Impossible de trouver les utilisateurs : {users}.",orgNotFound:"Impossible de trouver une organisation."},info:{expressSearch:"Appuyer sur Entrée pour ajouter ces utilisateurs."}},resolveIssues:{title:"Résoudre le ou les problèmes",okButton:"OK",cancel:"Annuler",reportedAgainst:"Signalé contre",resolvedBy:"Résolu par",issue:"Problème",items:"{count} élément(s)",revisionFamily:"Famille de révision",searchObjects:"Rechercher un ou plusieurs objets",pickObjects:"Sélectionner un objet",addObjectsForReportedAgainst:"Ajouter à Signalé contre",addObjectsForResolvedBy:"Ajouter à Résolu par",changeViewLayout:"Modifier la disposition de la vue",tooltips:{propagateTooltip:"Propager aux problèmes sélectionnés.",isLastRevision:"Il s'agit de la dernière révision",isNotLastRevision:"Il ne s'agit pas de la dernière révision",noIsLastRevision:"Non applicable"},contextualMenus:{detach:"Détacher",propagate:"Propager",history:"Historique",compare:"Comparer",whereused:"Cas d'utilisation",openWith:"Ouvrir avec",replaceByRevision:"Remplacer par une révision",replaceByLatestRevision:"Remplacer par la dernière révision",replaceByReleasedLatestRevision:"Remplacer par la dernière révision publiée",replaceByStableLatestRevision:"Remplacer par la dernière révision stable"},label:"Titre",name:"Nom",type:"Type",revision:"Révision",isLastRevision:"Est la dernière révision",common:"",state:"Etat de maturité",pickupError_needtoExitInspectionMode:"Impossible de sélectionner un objet si vous êtes en mode Inspection.",successResolved:"Le ou les objets associés sont à jour.",errorResolved:"Impossible de mettre à jour le ou les objets associés.",nothingToAdd:"Le ou les objets sélectionnés ont déjà été ajoutés.",nothingToReplace:"Il n'existe aucun objet à remplacer.",errorFetch:"Impossible de récupérer les informations sur l'objet.",errorGetIssues:"Impossible de récupérer les informations sur le problème.",errorShowIssues:"Veuillez sélectionnez le ou les problèmes à l'état Actif, puis réessayer.",errorNotSupportedMultipleObject:"Les objets multiples ne sont pas pris en charge.",errorNotSupportedObject:"Cet objet n'est pas pris en charge.",issueNotDroppable:"Cet objet n'est pas pris en charge.",propertiesTitle:"Propriétés",confirmDialog:{detachTitle:"Détacher {number} objet(s) de {issues} problème(s)",confirmDetach:"Voulez-vous vraiment détacher le ou les objets sélectionnés ?",propagateTitle:"Propager {number} objet(s) à {issues} problème(s)",confirmPropagate:"Voulez-vous vraiment propager le ou les objets sélectionnés ?",replaceByLatestRevisionTitle:"Remplacer {number} objet(s) par la dernière révision dans {issues} problème(s)",confirmReplaceByLatestRevision:"Voulez-vous vraiment remplacer le ou les objets sélectionnés par la dernière révision ?",replaceByReleasedLatestRevisionTitle:"Remplacer {number} objet(s) par la dernière révision publiée dans {issues} problème(s)",confirmReplaceByReleasedLatestRevision:"Voulez-vous vraiment remplacer le ou les objets sélectionnés par la dernière révision publiée ?",replaceByStableLatestRevisionTitle:"Remplacer {number} objet(s) par la dernière révision stable dans {issues} problème(s)",confirmReplaceByStableLatestRevision:"Voulez-vous vraiment remplacer le ou les objets sélectionnés par la dernière révision stable ?",confirmReplaceByTitleMessage:"{target} remplacé par {latest}"},contexts:{okButton:"OK",cancel:"Annuler",contexts:"Contextes",columnTitle:"Description courte",columnName:"Nom",columnType:"Type",columnRevision:"Révision",addContext:"Ajouter un contexte",pickContext:"Sélectionner le contexte",detachContext:"Détacher le contexte",contextualMenus:{detach:"Détacher",propagate:"Propager",history:"Historique",compare:"Comparer",whereused:"Cas d'utilisation",openWith:"Ouvrir avec"},errorNotSupportedMultipleObject:"Les objets multiples ne sont pas pris en charge.",errorNotSupportedObject:"Cet objet n'est pas pris en charge.",errorToGetContext:"Impossible de récupérer les informations sur l'objet contextuel.",successUpdateContext:"Le contexte a été mis à jour.",successDetachContext:"Le contexte a été détaché.",errorUpdateContext:"Impossible de mettre à jour le contexte.",errorDetachContext:"Impossible de détacher le contexte.",confirmDetachContextTitle:"Détacher le contexte",confirmDetachContextMessage:"Voulez-vous vraiment détacher ce contexte ?",confirmUpdateContextTitle:"Mettre à jour le contexte",confirmUpdateContextMessage:"Voulez-vous vraiment mettre à jour ce contexte ?"}},tasks:{selectIn3D:"Veuillez fournir un objet existant à ajouter, issu d'une application 3D compatible.",addObjects:"Veuillez fournir des objets existants à ajouter.",takeScreenshot:"Veuillez fournir une image à ajouter."},helper:{states:{create:"Le demandeur a créé un problème.",assign:"Le demandeur a affecté le problème afin que les personnes affectées puissent le traiter.",active:"Les personnes affectées traitent le problème.",review:"Le créateur du problème révise la solution proposée.",closed:"Le créateur a accepté la solution et le problème est fermé."},dialog:{title:"Applications de gestion des problèmes - Aide",tabStates:"Etats",tabShortcuts:"Raccourcis",subtitleShortcuts:"Touches de raccourci",subtitleMouseOperation:"Opérations de la souris",workflow:"Workflow",states:{create:"Le demandeur a créé un problème.",assign:"Le demandeur a affecté le problème afin que les personnes affectées puissent le traiter.",active:"Les personnes affectées traitent le problème.",review:"Le créateur du problème révise la solution proposée.",closed:"Le créateur a accepté la solution et le problème est fermé."},shortcut:{key:{shortcut:{"delete":"Supprimer",arrowUp:"Haut",arrowDown:"Bas",arrowLeft:"Gauche",arrowRight:"Droite",enter:"Entrée",shiftArrow:"Maj + Flèches",ctrlA:"Ctrl + A",ctrlC:"Ctrl + C"},mouse:{ctrlClick:"Ctrl + Clic",shiftClick:"Maj + Clic",doubleClick:"Double-clic"}},detail:{shortcut:{"delete":"Supprimer/Détacher l'élément",arrowUp:"Accéder à l'élément précédent",arrowDown:"Accéder à l'élément suivant",arrowLeft:"Réduire l'élément/Accéder à l'élément précédent",arrowRight:"Développer l'élément/Accéder à l'élément suivant",enter:"Ouvrir le panneau de propriétés/Soumettre le texte saisi",shiftArrow:"Sélectionner plusieurs éléments",ctrlA:"Sélectionner tous les éléments",ctrlC:"Copier l'élément sélectionné"},mouse:{ctrlClick:"Sélectionner plusieurs éléments sur lesquels vous avez cliqué/Désélectionner",shiftClick:"Sélectionner tous les éléments entre les clics",doubleClick:"Ouvrir le panneau de propriétés/Développer ou réduire l'élément"}}}}},users:{more:"Plus d'informations"}});