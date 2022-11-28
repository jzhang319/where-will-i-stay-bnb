import { BsSearch } from "react-icons/bs";

const NavButtons = () => {
  return (
    <div className="nav-search-btn-section">
      <div class="bnb-buttons">
        <div class="anywhere-btn">Anywhere</div>
        <div class="anyweek-btn">Any week</div>
        <div class="addguests-btn">Add guests</div>
        <button class="search-btn">
          <BsSearch />
          <img src="" alt="" />
        </button>
      </div>
    </div>
  );
};

export default NavButtons;
