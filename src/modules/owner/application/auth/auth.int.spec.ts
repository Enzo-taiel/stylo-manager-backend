import { AuthCase } from "./auth.case";
import { describe, it, jest, expect } from "@jest/globals"
import { AuthPassword } from "@/core/auth/domain/valueObjects/auth.password.vo";
import { AuthRepository } from "@/core/auth/infrastructure/auth.repository";
import { AuthCredential } from "@/core/auth/domain/valueObjects/auth.credential.vo";
import { InputValidationError } from "@/shared/errors/inputValidationError";

jest.mock("@/shared/database/withTransaction", () => ({
  withTransaction: async (fn: any) => fn(null),
}));

jest.mock("@/shared/security/jwt", () => ({
  createAccessToken: jest.fn(() => "ACCESS_TOKEN"),
  createRefreshToken: jest.fn(() => "REFRESH_TOKEN"),
  isMatchPassword: jest.fn(() => true),
}));

describe("AuthCase - signin (integration)", () => {
  it("should return tokens and user", async () => {
    const fakeUserEntity = {
      id: "user-id",
      toPrimitives: () => ({ id: "user-id", email: "test@test.com" }),
    };

    jest
      .spyOn(AuthRepository, "findByCredential")
      .mockResolvedValue(fakeUserEntity as any);

    const userCredential = AuthCredential.create("test@test.com")
    const userPassword = AuthPassword.create("valid-password-1")

    const result = await AuthCase.signin(userCredential, userPassword);

    expect(result.accessToken).toBe("ACCESS_TOKEN");
    expect(result.refreshToken).toBe("REFRESH_TOKEN");
    expect(result.user.email).toBe("test@test.com");
  });

  it("should throw InputValidationError if user not found", async () => {

    jest
      .spyOn(AuthRepository, "findByCredential")
      .mockResolvedValue(null)

    const credential = AuthCredential.create("test@test.com")
    const password = AuthPassword.create("valid-password-1")

    await expect(
      AuthCase.signin(credential, password)
    ).rejects.toThrow(InputValidationError)
  })

  it("should throw InputValidationError if password does not match", async () => {

    jest
      .spyOn(AuthRepository, "findByCredential")
      .mockResolvedValue({
        id: "user-id",
        toPrimitives: () => ({ id: "user-id", email: "test@test.com", password: AuthPassword.create("correct-password-1") }),
      } as any);

    const userCredential = AuthCredential.create("test@test.com")
    const userPassword = AuthPassword.create("wrong-password-1")

    jest
      .spyOn(require("@/shared/security/jwt"), "isMatchPassword")
      .mockReturnValueOnce(false);

    await expect(
      AuthCase.signin(userCredential, userPassword)
    ).rejects.toThrow(InputValidationError)

  })


});
