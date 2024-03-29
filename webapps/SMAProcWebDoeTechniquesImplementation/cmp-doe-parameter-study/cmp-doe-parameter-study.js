/**
 * @class element:cmp-doe-parameter-study
 * @noinstancector
 * @description
 * This component implements the Parameter Study technique in DOE.
 * The Parameter Study (Main Effects Screening) technique studies each factor at all specified
 * levels while all other factors are held fixed at their baseline.
 */

require(['SMAProcWebDoeTechniquesBase/SMAProcDesignDriverFactorImpl'],
function (SMAProcDesignDriverFactorImpl) {
    'use strict';
    Polymer(/** @lends element:cmp-doe-parameter-study# */{
        is: 'cmp-doe-parameter-study',
        properties: /** @lends element:cmp-doe-parameter-study# */{
            /**
             * Keys of the columns to be rendered for the factors table
             * @type {Array}
             */
            factorColumns: {
                type: Array,
                notify: true,
                value: ['numberoflevels', 'Lower', 'Upper', 'Levels', 'Relation', 'Baseline', 'Values']
            },
            /**
             * Names of the properties to be saved in the definition
             * @type {Array}
             */
            factorAttributes: {
                type: Array,
                notify: true,
                value: ['# Levels', 'Lower', 'Upper', 'Levels', 'Relation', 'Baseline', 'Values']
            },
            /**
             * The default values of the attributes for each factor
             * @type {Object}
             */
            factorAtrributeDefaultValues: {
                type: Object,
                value: {
                    '# Levels': '2',
                    Lower: '-10',
                    Upper: '10',
                    Levels: '-10 10',
                    Relation: 'diff',
                    Baseline: '0.0',
                    Values: '0.0 -10 10'
                }
            },
            /**
             * The factors are added/updated in this array as and when they are selected/updated by the user
             * @type {Array}
             */
            updatedFactors: {
                type: Array,
                notify: true,
                value: function() { return []; }
            },
            /**
             * Properties/options specific to the technique - Fractional Factorial.
             * The number of levels in Fractional Factorial technique can be only 2 or 3.
             * @type {Object}
             */
            techniqueOptions: {
                type: Object,
                value: function () {
                    return {
                        'IncludeBaseline': true
                    };
                }
            }
        },

        /**
         * Called after the element is attached to the document. Can be called multiple times during the lifetime of an element.
         * The first `attached` callback is guaranteed not to fire until after `ready`.
         */
        attached:function(){
            var that = this;
            this.async(function(){
                that.fire('techniqueloaded', that);
            });
        },

        /**
         * Updates the technique options as retrieved from the properties while updating UI in parent element cmp-doe
         * @param {Array} properties - An array of technique options or [SMAJSCMMProperty]{@link module:DS/JSCMM/SMAJSCMMProperty.SMAJSCMMProperty} objects
         */
        updateTechniqueOptions: function (properties) {
            for (var i = 0; i < properties.length; i++) {
                switch (properties[i].getName()) {
                case 'Include Baseline':
                    this.set('techniqueOptions.IncludeBaseline', properties[i].getValue());
                    break;
                }
            }
        },

        /**
         * Revisits each of the and its attributes and re-populates/re-calculates any missing attribute for the factors
         * @param {Array} factors - An array of factors containing the attributes
         */
        reviseFactorAttributes: function(factors) {
            for (var i = 0; i < factors.length; i++) {
                var revisedFactor = {};
                var levels = [];
                if ((factors[i]['Levels'] !== undefined) && (factors[i]['Levels'] !== ''))
                {
                    if (factors[i]['Levels'].split)
                        { levels = factors[i]['Levels'].split(' ').filter(SMAProcDesignDriverFactorImpl.hasEmptyValues); }
                }
                revisedFactor['Name'] = factors[i]['Name'];
                for (var j = 0; j < this.factorAttributes.length; j++){
                    switch (this.factorAttributes[j])
                    {
                        case 'Lower':
                            if ((factors[i]['Lower'] !== undefined) && (factors[i]['Lower'] !== ''))
                            {
                                revisedFactor['Lower'] = factors[i]['Lower'];
                            }
                            else if ((factors[i]['Levels'] !== undefined) && (factors[i]['Levels'] !== ''))
                            {
                                revisedFactor['Lower'] = levels[0];
                            }
                            else
                            {
                                revisedFactor['Lower'] = this.factorAtrributeDefaultValues['Lower'];
                            }
                        break;

                        case 'Upper':
                            if ((factors[i]['Upper'] !== undefined) && (factors[i]['Upper'] !== ''))
                            {
                                revisedFactor['Upper'] = factors[i]['Upper'];
                            }
                            else if ((factors[i]['Levels'] !== undefined) && (factors[i]['Levels'] !== ''))
                            {
                                revisedFactor['Upper'] = levels[levels.length - 1];
                            }
                            else
                            {
                                revisedFactor['Upper'] = this.factorAtrributeDefaultValues['Upper'];
                            }
                        break;

                        case 'Relation':
                            if ((factors[i]['Relation'] !== undefined) && (factors[i]['Relation'] !== ''))
                            {
                                revisedFactor['Relation'] = factors[i]['Relation'];
                            }
                            else
                            {
                                revisedFactor['Relation'] = this.factorAtrributeDefaultValues['Relation'];
                            }
                        break;

                        case 'Baseline':
                            if ((factors[i]['Baseline'] !== undefined) && (factors[i]['Baseline'] !== ''))
                            {
                                revisedFactor['Baseline'] = factors[i]['Baseline'];
                            }
                            else
                            {
                                revisedFactor['Baseline'] = this.factorAtrributeDefaultValues['Baseline'];
                            }
                        break;

                        case '# Levels':
                            if ((factors[i]['# Levels'] !== undefined) && (factors[i]['# Levels'] !== ''))
                            {
                                revisedFactor['# Levels'] = factors[i]['# Levels'];
                            }
                            else
                            {
                                revisedFactor['# Levels'] = this.factorAtrributeDefaultValues['# Levels'];
                            }
                        break;

                        case 'Levels':
                            if ((revisedFactor['Lower'] !== undefined) && (revisedFactor['Lower'] !== '') &&
                                    (revisedFactor['Upper'] !== undefined) && (revisedFactor['Upper'] !== ''))
                            {
                                if ((revisedFactor['# Levels'] !== undefined) && (revisedFactor['# Levels'] !== ''))
                                    { revisedFactor['Levels'] = SMAProcDesignDriverFactorImpl.getDistribution(revisedFactor['Lower'], revisedFactor['Upper'], revisedFactor['# Levels']); }
                                else
                                    { revisedFactor['Levels'] = SMAProcDesignDriverFactorImpl.getDistribution(revisedFactor['Lower'], revisedFactor['Upper'], this.factorAtrributeDefaultValues['# Levels']); }
                            }
                            else if ((factors[i]['Levels'] !== undefined) && (factors[i]['Levels'] !== ''))
                            {
                                revisedFactor['Lower'] = levels[0];
                                revisedFactor['Upper'] = levels[levels.length - 1];
                                revisedFactor['# Levels'] = levels.length;
                                revisedFactor['Levels'] = levels.join(' ');
                            }
                            else
                            {
                                revisedFactor['Levels'] = this.factorAtrributeDefaultValues['Levels'];
                            }
                        break;
                    }
                }
                this.push('updatedFactors', revisedFactor);
            }

            return this.updatedFactors;
        },

        /**
         * Updates the values column in the Factors tab of DOE.
         * Once the parameter/factor is selected, the values of the factor are calculated based on
         * the default values of the other attributes as defined in factorAttributes.
         * If the factor is updated then the values are recalculated.
         * @param {Object} factor - The factor that is to be updated based on its other attributes
         */
        populateFactorValues: function(factor) {
            var cellinfo = factor.cellinfo;
            var levels, levelsArr;
            if (cellinfo.colName === 'Levels') {
                levelsArr = cellinfo.value.split(' ').filter(SMAProcDesignDriverFactorImpl.hasEmptyValues);
                levels = levelsArr.join(' ');
                factor.Levels = levelsArr.join(' ');
                factor.Lower = levelsArr[0];
                factor.Upper = levelsArr[levelsArr.length-1];
                factor['# Levels'] = levelsArr.length;
            } else if (cellinfo.colName === '# Levels' || cellinfo.colName === 'Lower' || cellinfo.colName === 'Upper') {
                levels =
                    SMAProcDesignDriverFactorImpl.getDistribution(factor.Lower, factor.Upper, factor['# Levels']);
                factor.Levels = levels.join(' ');
            }
            if (factor.Levels && factor.Levels.join)
                { factor.Levels = factor.Levels.join(' '); }
            cellinfo.DOMrow.cells[5].getElementsByClassName('textInp')[0].value = factor.Levels;
            cellinfo.DOMrow.cells[5].getElementsByClassName('textInp')[0].title = factor.Levels;
            var values = SMAProcDesignDriverFactorImpl.getValues(factor.Levels, factor.Baseline, factor.Relation);
            values = factor.Baseline + ' ' + values;
            factor.Values = values;
            cellinfo.DOMrow.cells[9].textContent = values;
            cellinfo.DOMrow.cells[9].title = values;
        },

        /**
         * It updates the factor information when the user edits any of the columns in the factors table.
         * @param {Object} cellinfo - The cell information that has the column name and the value that was updated.
         * @param {String} paramName - Name of the parameter that was updated
         */
        updateFactorInfo: function (cellinfo, paramName) {
            var index = SMAProcDesignDriverFactorImpl.findFactor(paramName, this.updatedFactors);
            if (this.updatedFactors[index][cellinfo.colName]) {
                this.updatedFactors[index][cellinfo.colName] = cellinfo.value;
                this.updatedFactors[index].cellinfo = cellinfo;
                this.populateFactorValues(this.updatedFactors[index]);
            }
        },

        /**
         * Populates the cells in the factors table for the given factor.
         * @param {Object} factor - The factor that is to be updated based on its other attributes
         */
        populateFactorRow: function(factor) {
            var cellinfo = factor.cellinfo;
            cellinfo.DOMrow.cells[2].getElementsByClassName('textInp')[0].value = factor['# Levels'];
            cellinfo.DOMrow.cells[2].getElementsByClassName('textInp')[0].title = factor['# Levels'];
            cellinfo.DOMrow.cells[3].getElementsByClassName('textInp')[0].value = factor.Lower;
            cellinfo.DOMrow.cells[3].getElementsByClassName('textInp')[0].title = factor.Lower;
            cellinfo.DOMrow.cells[4].getElementsByClassName('textInp')[0].value = factor.Upper;
            cellinfo.DOMrow.cells[4].getElementsByClassName('textInp')[0].title = factor.Upper;
            cellinfo.DOMrow.cells[5].getElementsByClassName('textInp')[0].value = factor.Levels;
            cellinfo.DOMrow.cells[5].getElementsByClassName('textInp')[0].title = factor.Levels;
            cellinfo.DOMrow.cells[6].getElementsByTagName('select')[0].disabled = false;
            cellinfo.DOMrow.cells[6].children[0].selectedIndex = SMAProcDesignDriverFactorImpl.factorRelationOptions.value.indexOf(factor.Relation);
            cellinfo.DOMrow.cells[6].children[0].title = factor.Relation;
            cellinfo.DOMrow.cells[7].getElementsByClassName('textInp')[0].value = factor.Baseline;
            cellinfo.DOMrow.cells[7].getElementsByClassName('textInp')[0].title = factor.Baseline;
            this.populateFactorValues(factor);

        },

        /**
         * Populates the default values in the table for the factors on parameter selection,
         * also update the data structure for the parameters updatedFactors
         * @param {Object} cellinfo - The corresponding cell information of the selected factor to be updated
         * @param {String} paramName - Name of the parameter
         */
        populateDefaults: function(cellinfo, paramName) {

            if (SMAProcDesignDriverFactorImpl.findFactor(paramName, this.updatedFactors) < 0) {
                var factor = {
                        Name: paramName
                };
                for (var j = 0; j < this.factorAttributes.length; j++) {
                    factor[this.factorAttributes[j]] = this.factorAtrributeDefaultValues[this.factorAttributes[j]];
                    if (this.factorAttributes[j] === 'Baseline' && (cellinfo.paraminfo && cellinfo.paraminfo.value !== null && cellinfo.paraminfo.value !== undefined)) {
                        factor[this.factorAttributes[j]] = cellinfo.paraminfo.value;
                    }
                }
                if (parseFloat(factor['Baseline']) !== 0) {
                    factor['Relation'] = '%';
                }
                factor['cellinfo'] = cellinfo;
                this.populateFactorRow(factor);
                this.push('updatedFactors', factor);
            }

            return this.updatedFactors;
        },

        /**
         * It is called from the Apply() method of cmp-doe, it sets the technique options in the plugin configuration.
         * @param {module:DS/JSCMM/SMAJSCMMExtensionConfig.SMAJSCMMExtensionConfig} pluginExtensionConfig - selected plugin configuration
         */
        Apply: function (pluginExtensionConfig) {
            console.log('In Apply() of cmp-doe-fractional-factorial..');
            // Set descriptor values with attribute settings
            if (null === pluginExtensionConfig)
                { return false; }
            if (pluginExtensionConfig.getPropertyByName('Technique Options')) {
                var properties = pluginExtensionConfig.getPropertyByName('Technique Options').getProperties();
                for (var i = 0; i < properties.length; i++){
                    switch (properties[i].getName()) {
                    case 'Include Baseline':
                        properties[i].setValue(this.techniqueOptions.IncludeBaseline);
                        break;
                    }
                }
            }
        }
    });
});
