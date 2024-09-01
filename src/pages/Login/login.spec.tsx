import { describe, expect, it } from "vitest";
import { render,screen } from "@testing-library/react";
import LoginPage from "./loginPage";


describe("Login Page", () => {
    it("Should return with required field", () => {
        render(<LoginPage />);
        // getBy = thrown an error
        //findBy = async
        //queryBy = null
        expect(screen.getByText(/Sign in/)).toBeInTheDocument()
        expect(screen.getByPlaceholderText('username')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('password')).toBeInTheDocument()
        expect(screen.getByRole("button", { name: "Log in" })).toBeInTheDocument()
        expect(screen.getByRole("checkbox", { name: "Remember me" })).toBeInTheDocument()
        expect(screen.getByText("Forget Password")).toBeInTheDocument()
    });
});
