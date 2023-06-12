import axios from 'axios';
import handle from '../../utils/error';
// Mock axios.isAxiosError and console.error
jest.mock('axios', () => ({
  isAxiosError: jest.fn(),
}));
console.error = jest.fn();

describe('handle', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('logs server error with status code if response exists', () => {
    const error = {
      response: {
        status: 404,
      },
    };

    if (jest.isMockFunction(axios.isAxiosError)) {
      (axios.isAxiosError as jest.Mock).mockReturnValue(true);
    }

    handle(error);

    expect(console.error).toHaveBeenCalledWith(
      'Server returned an error with status code: 404'
    );
  });

  test('logs "No response from the server" if request exists but no response', () => {
    const error = {
      request: {},
    };

    if (jest.isMockFunction(axios.isAxiosError)) {
      (axios.isAxiosError as jest.Mock).mockReturnValue(true);
    }

    handle(error);

    expect(console.error).toHaveBeenCalledWith('No response from the server');
  });

  test('logs "Axios library internal error" if neither response nor request exists', () => {
    const error = {};

    if (jest.isMockFunction(axios.isAxiosError)) {
      (axios.isAxiosError as jest.Mock).mockReturnValue(true);
    }

    handle(error);

    expect(console.error).toHaveBeenCalledWith('Axios library internal error');
  });

  test('logs "Internal code error, we did something wrong" for non-Axios errors', () => {
    const error = new Error('Some error');

    if (jest.isMockFunction(axios.isAxiosError)) {
      (axios.isAxiosError as jest.Mock).mockReturnValue(false);
    }

    handle(error);

    expect(console.error).toHaveBeenCalledWith(
      'Internal code error, we did something wrong'
    );
  });
});
