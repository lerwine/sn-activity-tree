(function executeRule(current, previous /*null when async*/) {
    var state = parseInt(current.state);
    if (state == 1 || state == 2)
        return;
    var gr = new GlideRecord('x_44813_persactivt_activity');
    gr.addQuery('parent', current.sys_id);
    gr.query();
    var notification;
    if (gr.next()) {
        if (state > 2) {
            do {
                if (parseInt(gr.state) < 3) {
                    current.state.setError('Cannot be in closed state: One or more dependent activities are not closed.');
                    current.setAbortAction(true);
                    return;
                }
            } while (gr.next());
        } else {
            do {
                state = parseInt(gr.state);
                if (state == 1 || state == 2) {
                    current.state.setError('Cannot be in pending state: One or more dependent activities are neither pending, nor closed.');
                    current.setAbortAction(true);
                    return;
                }
            } while (gr.next());
        }
    }
})(current, previous);
