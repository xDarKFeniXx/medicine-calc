import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import {notificationsSelector} from "../../store/app-reducer/app-selectors";
import {closeNotificationAction} from "../../store/app-reducer/app-reducer";



const Notifier = () => {
    const dispatch = useDispatch();
    const notifications = useSelector(notificationsSelector);

    const { enqueueSnackbar} = useSnackbar();



    React.useEffect(() => {
        // @ts-ignore
        notifications.forEach(({ key, message, type }) => {

            enqueueSnackbar(message, {
                key,
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',

                },
                variant: type,
                onExited: (event, myKey) => {
                    // remove this snackbar from redux store
                    dispatch(closeNotificationAction(myKey));
                },
            });


        });
    }, [notifications, enqueueSnackbar, dispatch]);

    return null;
};

export default Notifier;
