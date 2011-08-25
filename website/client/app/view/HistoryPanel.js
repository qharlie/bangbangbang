/**
 * User: charlie
 * Date: 8/24/11
 * Time: 5:00 PM
 */
/**
 * User: Charlie Sanders
 * Date: 7/1/11
 * Time: 8:25 PM
 */


Ext.define('Bang.view.HistoryPanel', {
    extend: 'Ext.panel.Panel',
    title: 'History',
    region: 'west',
    width: 200,
    collapsible: true,
    split: true,
    bodyMargin: "5 5 5 5",
    items:
        [
            {
                html: '<div class="menuPanel"><img src="resources/images/clock.png" alt=""> <a href="#">10 days ago</a><hr style="height: 1px;"/>' +
                    '<img src="resources/images/clock.png" alt=""> <a href="#">7 days ago</a><hr style="height: 1px;"/>' +
                    '<img src="resources/images/clock.png" alt=""> <a href="#">2 days ago</a><hr style="height: 1px;"/>' +
                    '<img src="resources/images/clock.png" alt=""> <a href="#">3 hours ago</a><hr style="height: 1px;"/>' +
                    '<img src="resources/images/clock.png" alt=""> <a href="#">5 minutes ago</a><hr style="height: 1px;"/>' +
                    '</div>', border: false
            }

        ]
});