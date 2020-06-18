define("DS/MPFInvoiceModel/InvoiceDocumentModel",["UWA/Promise","DS/MPFModel/MPFModel"],function(a,c){var d={};d.DOC_URL="docUrl";d.DOC_NAME="docName";d.DOC_IDS="documentIDs";var b;b=c.extend({idAttribute:"documentIDs",setup:function(e,f){this._parent(e,f);this._type="InvoiceDocumentModel"},saveFile:function(g,f){var e=a.deferred();var h;h=new FormData();h.append("file",g);if(!(f)){f={}}f.method="POST";f.data=h;f.onComplete=e.resolve;f.onFailure=e.reject;this.save(null,f);return e.promise},getDocUrl:function(){return this.get(d.DOC_URL)},getDocIDs:function(){return this.get(d.DOC_IDS)},getDocName:function(){return this.get(d.DOC_NAME)},setDocName:function(e){return this.set(d.DOC_NAME,e)}});return b});define("DS/MPFInvoiceModel/InvoiceModel",["DS/MPFModel/MPFModel"],function(b){var a;var c={};var d={};c.ID="id";c.CURRENT="current";c.ORGANIZATION="organization";c.NAME="name";c.INVOICE="invoice";c.TYPE="type";d.INVOICE="MP_Invoice";a=b.extend({setup:function(e,f){this._parent(e,f);this._type="InvoiceModel"},getInvoice:function(){return this.get(c.INVOICE)},getType:function(){return this.get(c.TYPE)},getName:function(){return this.get(c.NAME)}});a.Fields=Object.freeze(c);a.Types=Object.freeze(d);return a});define("DS/MPFInvoiceModel/CartInvoiceDocumentDataProxy",["UWA/String","DS/MPFDataProxy/DataProxy","DS/MPFError/NotImplementedError"],function(d,c,a){var b;b=c.extend({init:function(e,f){this._parent(e,"/mdcart/carts/{0}/buyer-invoice/document",f)},buildPath:function(f,e){return d.format(this.resourcePath,f.parentResourceId)},urlGet:function(f,e){return this.delegate.urlGet(f,e)},urlPut:a.emit,urlPatch:a.emit,urlDelete:a.emit,doGet:function(f,e){return this.delegate.doGet(f,e)},doPut:a.emit,doPatch:a.emit,doDelete:a.emit});return b});define("DS/MPFInvoiceModel/CartInvoiceDataProxy",["UWA/String","DS/MPFDataProxy/DataProxy","DS/MPFError/NotImplementedError"],function(d,c,a){var b;b=c.extend({init:function(e,f){this._parent(e,"/mdcart/carts/{0}/invoices",f)},buildPath:function(f,e){return d.format(this.resourcePath,f.parentResourceId)},urlPost:a.emit,urlPut:a.emit,urlPatch:a.emit,urlDelete:a.emit,doPost:a.emit,doPut:a.emit,doPatch:a.emit,doDelete:a.emit});return b});define("DS/MPFInvoiceModel/InvoiceCollection",["DS/MPFModel/MPFCollection","DS/MPFInvoiceModel/InvoiceModel"],function(c,a){var b;b=c.extend({model:a});return b});