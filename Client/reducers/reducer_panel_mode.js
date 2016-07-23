import { NAV_CLICK_FILTER } from '..actions/index';
import { NAV_CLICK_COLLECTION } from '..actions/index';

export default function(state = null, action) {
  switch (action.type) {
  case NAV_CLICK_FILTER:
    return state = action.payload;
  case NAV_CLICK_COLLECTION:
    return state = action.payload;
  }
  return state;
}
