import FoodReviewForm from './FoodReviewForm';
import WorkspaceReviewForm from './WorkspaceReviewForm';
import BeverageReviewForm from './BeverageReviewForm';
import HostelReviewForm from './HostelReviewForm';
import HotelReviewForm from './HotelReviewForm';
import AirbnbReviewForm from './AirbnbReviewForm';
import HiddenGemReviewForm from './HiddenGemReviewForm';

export {
  FoodReviewForm,
  WorkspaceReviewForm,
  BeverageReviewForm,
  HostelReviewForm,
  HotelReviewForm,
  AirbnbReviewForm,
  HiddenGemReviewForm,
};

export const FORM_MAP = {
  workspaces: WorkspaceReviewForm,
  food: FoodReviewForm,
  beverages: BeverageReviewForm,
  hostels: HostelReviewForm,
  hotels: HotelReviewForm,
  airbnbs: AirbnbReviewForm,
  hidden_gems: HiddenGemReviewForm,
};