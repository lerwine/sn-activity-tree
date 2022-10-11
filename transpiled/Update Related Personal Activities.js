(function executeRule(current, previous /*null when async*/) {
	var activityGr = new GlideRecord('x_44813_persactivt_activity');
	activityGr.addQuery('task', current.getValue('sys_id'));
	if (!activityGr.next())
		return;
	var gr = new GlideRecord('x_44813_persactivt_state_mapping');
	var tableName = current.getTableName();
	gr.addQuery('table', tableName);
	var state = parseInt(current.getValue('state'));
	gr.addQuery('source', state);
	gr.addQuery('inactive', false);
	gr.query();
	if (gr.next())
		state = parseInt(gr.getValue('mapped'));
	else if (state < 0)
		state = -5;
	else if (state > 3)
		state = 3;
	else if (state == 0)
		state = 1;
	var impact = parseInt(current.getValue('impact'));
	if (isNaN(impact))
		impact = 2;
	else if (impact < 1)
		impact = 1;
	else if (impact > 3)
		impact = 3;
	var urgency = parseInt(current.getValue('urgency'));
	if (isNaN(urgency))
		urgency = 2;
	else if (urgency < 1)
		urgency = 1;
	else if (urgency > 3)
		urgency = 3;
	var priority = parseInt(current.getValue('urgency'));
	if (isNaN(priority))
		priority = urgency + impact - 1;
	else if (priority < 1)
		priority = 1;
	else if (priority > 5)
		priority = 5;
	do {
		var changed = [];
		if (parseInt(activityGr.getValue('state')) != state) {
			activityGr.setValue('state', state);
			changed.push('state');
		}
		if (parseInt(activityGr.getValue('urgency')) != urgency) {
			activityGr.setValue('urgency', urgency);
			changed.push('urgency');
		}
		if (parseInt(activityGr.getValue('impact')) != impact) {
			activityGr.setValue('impact', impact);
			changed.push('impact');
		}
		if (parseInt(activityGr.getValue('priority')) != priority) {
			activityGr.setValue('priority', priority);
			changed.push('priority');
		}
		if (changed.length == 1)
			activityGr.update('Changed: ' + tableName + '.' + changed[0]);
		else if (changed.length > 1)
			activityGr.update('Changed: ' + tableName + '.' + changed.join('; ' + tableName + '.'));
	} while (activityGr.next());
})(current, previous);
