import sys
sys.path.append("../../src")

import pytest
from utils.validatorUtil import ValidatorUtil

def test_validate_booking_date_time():
    with pytest.raises(ValueError):
        ValidatorUtil.validate_booking_date_time("2023-04-02", "morning")
        ValidatorUtil.validate_booking_date_time("2023-04-02", "afternoon")
        
def test_validate_phone():
    with pytest.raises(ValueError):
        ValidatorUtil.validate_phone("")
        ValidatorUtil.validate_phone("091")
        
def test_validate_birthday():
    with pytest.raises(ValueError):
        ValidatorUtil.validate_birthday("2023-05-05")
        ValidatorUtil.validate_birthday("2023-11-05")