const getTouchDistinguisher = () => {
  const pinchTouchIdentifiers = new Set(); // record all pinch touch identifiers

  function _recordPinchTouchIdentifiers(event) {
    for (const touch of event.touches) {
      pinchTouchIdentifiers.add(touch.identifier);
    }
  }

  function _isPinch(event) {
    return (
      (event.touches !== undefined && event.touches.length > 1) ||
      (event.scale !== undefined && event.scale !== 1)
    );
  }

  function _wasPinch(event) {
    // only check one changedTouch because touchEnd event that would be recognized as swiping only has one changedTouch
    return (
      event.changedTouches &&
      pinchTouchIdentifiers.has(event.changedTouches[0].identifier)
    );
  }

  function isPinch(event) {
    if (_isPinch(event)) {
      _recordPinchTouchIdentifiers(event);
      return true;
    }
    return _wasPinch(event);
  }

  return { isPinch };
};

const useTouch = ({ swipeMove, swipeEnd }) => {
  const touchDistinguisher = getTouchDistinguisher();
  let swipeStartX = 0;

  const handleTouchStart = (event) => {
    if (touchDistinguisher.isPinch(event)) return;
    swipeStartX = event.touches[0].clientX;
  };

  const handleTouchMove = (event) => {
    if (touchDistinguisher.isPinch(event)) return;
    const swipeDisplacement = event.changedTouches[0].clientX - swipeStartX;
    swipeMove(swipeDisplacement);
  };

  const handleTouchEnd = (event) => {
    if (touchDistinguisher.isPinch(event)) return;
    const swipeDisplacement = event.changedTouches[0].clientX - swipeStartX;
    swipeMove(swipeDisplacement);
    swipeEnd(swipeDisplacement);
  };

  return {
    onTouchStart: (event) => handleTouchStart(event),
    onTouchMove: (event) => handleTouchMove(event),
    onTouchEnd: (event) => handleTouchEnd(event),
    onTouchCancel: (event) => handleTouchEnd(event)
  };
};

export default useTouch;
