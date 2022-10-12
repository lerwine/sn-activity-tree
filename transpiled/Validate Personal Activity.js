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
                    notification = new UINotification('demo_notification');
                    notification.setAttribute('state', 'Cannot be in closed state: One or more dependent activities are not closed.');
                    notification.send();
                    current.setAbortAction(true);
                    return;
                }
            } while (gr.next());
        } else {
            do {
                state = parseInt(gr.state);
                if (state == 1 || state == 2) {
                    notification = new UINotification('demo_notification');
                    notification.setAttribute('state', 'Cannot be in pending state: One or more dependent activities are neither pending, nor closed.');
                    notification.send();
                    current.setAbortAction(true);
                    return;
                }
            } while (gr.next());
        }
    }
})(current, previous);