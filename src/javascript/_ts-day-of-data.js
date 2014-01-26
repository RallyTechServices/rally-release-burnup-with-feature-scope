/**
 * a calculator for each day of data,
 * given a snap for that day, will calculate a
 * ** baseline of total value of a given field
 * 
 * assumes that each individual snap represents one unique item
 */
 
 Ext.define('TSDay',{
    extend: 'Ext.data.Model',
    group_totals: {},
    fields: [
        {name:'JSDate',type:'date',defaultValue:new Date()},
        {name:'baselineFieldName',type:'string',defaultValue:'c_PIPlanEstimate'}, /* the name of the field with a value to add (or count), remember the c_! */
        {name:'baselineTotal',type:'number',defaultValue:0}
    ],
    constructor: function(data) {
        this.group_totals = {};
        this.callParent(arguments);
    },
    /**
     * Given a single lookback snapshot, aggregate data
     * @param {} snap
     */
    addSnap: function(snap){
        var baseline_total = this.get('baselineTotal');
        var baseline_field_name = this.get('baselineFieldName');
        
        var value_in_snap = 0;
        if ( baseline_field_name === "Count" ) {
            value_in_snap = 1;
        } else {
            if (Ext.isNumber(snap.get(baseline_field_name))) {
                value_in_snap = snap.get(baseline_field_name);
            }
        }
        baseline_total = baseline_total + value_in_snap;
        this.set('baselineTotal',baseline_total);
    }
    
 });
