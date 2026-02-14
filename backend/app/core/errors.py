"""Custom exceptions"""


class VilibrityException(Exception):
    """Base exception for the application"""
    pass


class AniListException(VilibrityException):
    """Exception for AniList API errors"""
    pass


class ExternalAPIException(VilibrityException):
    """Exception for external API errors"""
    pass


class ValidationException(VilibrityException):
    """Exception for validation errors"""
    pass
