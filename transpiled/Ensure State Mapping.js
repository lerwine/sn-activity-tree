(function() {
    var gr = new GlideRecord('x_44813_persactivt_state_mapping');
    gr.query();
    if (gr.next())
        return;
    var mappings = [{
            table: "problem",
            source: 101, // New
            mapped: 1
        },
        {
            table: "problem",
            source: 102, // Assess
            mapped: 1
        },
        {
            table: "problem",
            source: 103, // Root Cause Analysis
            mapped: 2
        },
        {
            table: "problem",
            source: 104, // Fix in Progress
            mapped: 2
        },
        {
            table: "problem_task",
            source: 151, // New
            mapped: 1
        },
        {
            table: "problem_task",
            source: 152, // Assess
            mapped: 1
        },
        {
            table: "problem_task",
            source: 154, // Work in Progress
            mapped: 2
        },
        {
            table: "incident",
            source: 3, // On Hold
            mapped: -5
        },
        {
            table: "change_request",
            source: -5, // New
            mapped: 1
        },
        {
            table: "change_request",
            source: -1, // Implement
            mapped: 2
        },
        {
            table: "dmn_demand",
            source: 2, // Submitted
            mapped: 1
        },
        {
            table: "dmn_demand",
            source: 3, // Screening
            mapped: 2
        },
        {
            table: "dmn_demand",
            source: -4, // Qualified
            mapped: 2
        },
        {
            table: "dmn_demand",
            source: 10, // Deferred
            mapped: -5
        },
        {
            table: "sn_deploy_pipeline_deployment_request",
            source: 1, // In Review
            mapped: 2
        },
        {
            table: "sn_deploy_pipeline_deployment_request",
            source: 2, // Closed - Published
            mapped: 3
        },
        {
            table: "sn_collab_request_dev_collab_task",
            source: 2, // Closed - Approved
            mapped: 3
        },
        {
            table: "itfm_budget_task",
            source: 3, // Awaiting Input
            mapped: -5
        },
        {
            table: "itfm_budget_task",
            source: 4, // Pending Approval
            mapped: -5
        },
        {
            table: "scan_task",
            source: 3, // On Hold
            mapped: -5
        },
        {
            table: "im_idea_core",
            source: -5, // Draft
            mapped: -5
        },
        {
            table: "im_idea_core",
            source: 1, // Submitted
            mapped: -5
        },
        {
            table: "im_idea_core",
            source: 2, // In Backlog
            mapped: -5
        },
        {
            table: "im_idea_core",
            source: 4, // Planned
            mapped: 1
        },
        {
            table: "im_idea_core",
            source: 5, // In Development
            mapped: 2
        }
    ];
    for (var i = 0; i < mappings.length; i++) {
        var m = mappings[i];
        gr = new GlideRecord('x_44813_persactivt_state_mapping');
        gr.initialize();
        gr.setValue('table', m.table);
        gr.setValue('source_value', '' + m.source);
        gr.setValue('mapped_value', '' + m.mapped);
        gr.insert();
    }
})();