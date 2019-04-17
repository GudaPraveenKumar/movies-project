import * as Sentry from '@sentry/browser';

function init() {
    // Sentry.init({
    //     dsn: "https://9148f6ff8fb44c498548d943fe72a449@sentry.io/1441438"
    // });

}

function log(error) {
    // Sentry.withScope(scope => {
    //     scope.setExtra(error);
    //     Sentry.captureException(error);
    // })
    console.log(error);
}

export default {
    init,
    log
};