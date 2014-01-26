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
        {name:'piSizeFieldName',type:'string',defaultValue:'c_PIPlanEstimate'}, /* the name of the field with a value to add (or count), remember the c_! */
        {name:'piSizeTotal',type:'number',defaultValue:0},
        {name:'wpSizeFieldName',type:'string',defaultValue:'PlanEstimate'},
        {name:'wpSizeTotal',type:'number',defaultValue:0}
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
        var record_type_hierarchy = snap.get('_TypeHierarchy');
        if ( !record_type_hierarchy || Ext.Array.indexOf(record_type_hierarchy,'PortfolioItem') !== -1 ) {
            this._updatePIData(snap);
        }
        if ( !record_type_hierarchy || 
            Ext.Array.indexOf(record_type_hierarchy,'HierarchicalRequirement') !== -1 || 
            Ext.Array.indexOf(record_type_hierarchy,'Defect') !== -1 ) {
            
            this._updateWPData(snap);
        }
    },
    _updatePIData:function(snap){
        var pi_total = this.get('piSizeTotal');
        var pi_field_name = this.get('piSizeFieldName');
        
        var value_in_snap = 0;
        if ( pi_field_name === "Count" ) {
            value_in_snap = 1;
        } else {
            if (Ext.isNumber(snap.get(pi_field_name))) {
                value_in_snap = snap.get(pi_field_name);
            }
        }
        pi_total = pi_total + value_in_snap;
        this.set('piSizeTotal',pi_total);
    },
    _updateWPData:function(snap){
        var wp_total = this.get('wpSizeTotal');
        var wp_field_name = this.get('wpSizeFieldName');
        
        var value_in_snap = 0;
        if ( wp_field_name === "Count" ) {
            value_in_snap = 1;
        } else {
            if (Ext.isNumber(snap.get(wp_field_name))) {
                value_in_snap = snap.get(wp_field_name);
            }
        }
        wp_total = wp_total + value_in_snap;
        this.set('wpSizeTotal',wp_total);
    }
    
 });
