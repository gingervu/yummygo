import bcrypt

# Hàm băm mật khẩu
def hash_password(plain_password: str) -> str:
    """
    Băm mật khẩu sử dụng bcrypt.

    :param plain_password: Mật khẩu gốc (plain text)
    :return: Mật khẩu đã được băm
    """
    if not plain_password:
        raise ValueError("Password cannot be empty")

    salt = bcrypt.gensalt()  # Tạo salt ngẫu nhiên
    hashed_password = bcrypt.hashpw(plain_password.encode('utf-8'), salt)
    return hashed_password.decode('utf-8')

# Hàm kiểm tra mật khẩu
def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Kiểm tra mật khẩu đã được băm.

    :param plain_password: Mật khẩu gốc (plain text)
    :param hashed_password: Mật khẩu đã được băm
    :return: True nếu mật khẩu khớp, False nếu không khớp
    """
    if not plain_password or not hashed_password:
        return False  # Trả về False nếu bất kỳ giá trị nào bị rỗng

    try:
        return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))
    except ValueError:
        # Lỗi xảy ra nếu hashed_password không đúng định dạng của bcrypt
        return False

# Hàm thay đổi mật khẩu (nếu cần)
def change_password(old_password: str, new_password: str, hashed_password: str) -> str:
    """
    Đổi mật khẩu sau khi xác minh mật khẩu cũ.

    :param old_password: Mật khẩu cũ (plain text)
    :param new_password: Mật khẩu mới (plain text)
    :param hashed_password: Mật khẩu cũ đã băm
    :return: Mật khẩu mới đã băm
    """
    if not verify_password(old_password, hashed_password):
        raise ValueError("Old password is incorrect")

    return hash_password(new_password)

# Kiểm tra trực tiếp (nếu chạy riêng file này)
if __name__ == "__main__":
    # Mật khẩu gốc
    plain_password = "my_secure_password"

    # Băm mật khẩu
    hashed = hash_password(plain_password)
    print("Hashed password:", hashed)

    # Kiểm tra mật khẩu đúng
    is_valid = verify_password("my_secure_password", hashed)
    print("Password valid:", is_valid)

    # Kiểm tra mật khẩu sai
    is_invalid = verify_password("wrong_password", hashed)
    print("Password invalid:", is_invalid)
