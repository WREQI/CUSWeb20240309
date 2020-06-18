define('DS/EPInputs/EPInputsDefine', [
	'DS/EPInputs/EPMouse',
	'DS/EPInputs/EPMouseEvent',
	'DS/EPInputs/EPMouseEnableEvent',
	'DS/EPInputs/EPMouseDisableEvent',
	'DS/EPInputs/EPMouseMoveEvent',
	'DS/EPInputs/EPMousePressEvent',
	'DS/EPInputs/EPMouseReleaseEvent',
    'DS/EPInputs/EPMouseClickEvent',
	'DS/EPInputs/EPMouseDoubleClickEvent',
	'DS/EPInputs/EPMouseWheelEvent',
	'DS/EPInputs/EPTouch',
	'DS/EPInputs/EPTouchEvent',
	'DS/EPInputs/EPTouchEnableEvent',
	'DS/EPInputs/EPTouchDisableEvent',
	'DS/EPInputs/EPTouchMoveEvent',
	'DS/EPInputs/EPTouchIdleEvent',
	'DS/EPInputs/EPTouchPressEvent',
	'DS/EPInputs/EPTouchReleaseEvent',
	'DS/EPInputs/EPMultiTouchEvent',
	'DS/EPInputs/EPGestureEvent',
	'DS/EPInputs/EPGestureEnableEvent',
	'DS/EPInputs/EPGestureDisableEvent',
	'DS/EPInputs/EPGestureTapEvent',
	'DS/EPInputs/EPGestureDoubleTapEvent',
	'DS/EPInputs/EPGestureHoldEvent',
	'DS/EPInputs/EPGestureDragEvent',
	'DS/EPInputs/EPGesturePanEvent',
	'DS/EPInputs/EPGesturePinchEvent',
	'DS/EPInputs/EPGestureRotateEvent',
	'DS/EPInputs/EPGestureSwipeEvent',
	'DS/EPInputs/EPKeyboard',
	'DS/EPInputs/EPKeyboardEvent',
	'DS/EPInputs/EPKeyboardEnableEvent',
	'DS/EPInputs/EPKeyboardDisableEvent',
	'DS/EPInputs/EPKeyboardPressEvent',
	'DS/EPInputs/EPKeyboardReleaseEvent',
    'DS/EPInputs/EPGamepad',
    'DS/EPInputs/EPGamepadEvent',
	'DS/EPInputs/EPGamepadEnableEvent',
	'DS/EPInputs/EPGamepadDisableEvent',
    'DS/EPInputs/EPGamepadAxisEvent',
    'DS/EPInputs/EPGamepadPressEvent',
    'DS/EPInputs/EPGamepadReleaseEvent',
	'DS/EPInputs/EPDevice',
    'DS/EPInputs/EPDeviceEvent',
	'DS/EPInputs/EPDeviceEnableEvent',
	'DS/EPInputs/EPDeviceDisableEvent',
    'DS/EPInputs/EPDeviceAxisEvent',
    'DS/EPInputs/EPDevicePressEvent',
    'DS/EPInputs/EPDeviceReleaseEvent',
	'DS/EPInputs/EPDeviceTrackerEvent',
    'DS/EPInputs/EPDevices'
], function (Mouse, MouseEvent, MouseEnableEvent, MouseDisableEvent, MouseMoveEvent, MousePressEvent, MouseReleaseEvent, MouseClickEvent, MouseDoubleClickEvent, MouseWheelEvent,
	Touch, TouchEvent, TouchEnableEvent, TouchDisableEvent, TouchMoveEvent, TouchIdleEvent, TouchPressEvent, TouchReleaseEvent, MultiTouchEvent,
	GestureEvent, GestureTapEvent, GestureDoubleTapEvent, GestureHoldEvent, GestureDragEvent, GesturePanEvent, GesturePinchEvent, GestureRotateEvent, GestureSwipeEvent,
	Keyboard, KeyboardEvent, KeyboardEnableEvent, KeyboardDisableEvent, KeyboardPressEvent, KeyboardReleaseEvent,
	Gamepad, GamepadEvent, GamepadEnableEvent, GamepadDisableEvent, GamepadAxisEvent, GamepadPressEvent, GamepadReleaseEvent,
	Device, DeviceEvent, DeviceEnableEvent, DeviceDisableEvent, DeviceAxisEvent, DevicePressEvent, DeviceReleaseEvent, DeviceTrackerEvent, Devices) {
    'use strict';

    return Devices;
});
